import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Device, Location } from './model'
import { VendorOAuthResponse, Vendors } from 'src/vendors'
import { UserService } from 'src/users/service'
import {
  CONFIRMATION_CODE_LENGTH,
  MAX_CONFIRMATION_CODE_ATTEMPTS,
  USERSTACK_API_KEY
} from 'src/config'
import { http } from 'src/util/http'
import { signJwt } from 'src/util/jwt'
import { MailService } from 'src/mail/service'
import { FlattenedUser } from 'src/users/model'
import * as User from 'src/users/entities/user'
import * as EmailCodes from './entities/emails'
import * as LoginAttempt from './entities/login'
import * as ExternalCredentials from './entities/external'

export type IAuthAction = 'login' | 'signup' | 'link'

async function ipLocation(ip:string):Promise<Location> {
  try {
    const { data } = await http.get(`http://ip-api.com/json/${ip}`)
    return data
  } catch(e) {
    return null
  }
}

async function userAgentDevice(userAgent:string) {
  try {
    const { data } = await http.get(`http://api.userstack.com/detect?access_key=${USERSTACK_API_KEY}&ua=${userAgent}`)
    return data
  } catch(e) {
    return null
  }
}

const randomInt = (min:number=0, max:number=9) => Math.floor(Math.random() * (max - min + 1)) + min
const randomCode = (length:number=CONFIRMATION_CODE_LENGTH) => {
  const nums = []
  for(let i = 0; i < length; i++) {
    nums.push(randomInt())
  }
  return nums.join('')
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    @InjectRepository(EmailCodes.Entity) public readonly emailCodes: EmailCodes.Repository,
    @InjectRepository(LoginAttempt.Entity) public readonly loginAttempts: LoginAttempt.Repository,
    @InjectRepository(ExternalCredentials.Entity) public readonly externalCredentials: ExternalCredentials.Repository,
  ) {}

  public async issueAccountTokens(userAccount:User.Entity) {
    return {
      account: new FlattenedUser(userAccount),
      accessToken: '',
      refreshToken: '',
    }
  }

  public async issueRegistrationToken(registrant:{ email: string } | VendorOAuthResponse) {
    return { registrant, registrationToken: signJwt(registrant) }
  }

  public async initEmailVerification(email:string) {
    const existing = await this.emailCodes.findOne({ email })
    if (existing) {
      await this.emailCodes.softDelete({ email })
    }
    const code = randomCode()
    await MailService.SendConfirmation(email, code)
    await this.emailCodes.save({ email, code })
    return code
  }

  public async completeEmailVerification(email:string, code:string) {
    const valid = await this.emailCodes.findOne({ email })
    if (!valid) {
      return false
    }
    if (code !== valid.code) {
      const attempts = valid.attempts + 1
      await this.emailCodes.save({ ...valid, attempts })
      if (valid.attempts >= MAX_CONFIRMATION_CODE_ATTEMPTS) {
        await this.emailCodes.softDelete({ email })
      }
      return false
    }
    await this.emailCodes.softDelete({ email })
    return true
  }

  public async createLoginAttempt(loginAttempt:LoginAttempt.Entity) {
    let device:Device, location:Location
    const promises = []
    if (!loginAttempt.device) {
      promises.push(userAgentDevice(loginAttempt.userAgent).then(r => device = r).catch(e => null))
    }
    if (!loginAttempt.location) {
      promises.push(ipLocation(loginAttempt.ip).then(r => location = r).catch(e => null))
    }
    await Promise.all(promises)
    return this.loginAttempts.save({
      device,
      location,
      ...loginAttempt,
    }) 
  }

  public async saveVendorCredentials(vendorId:Vendors, vendorRes:VendorOAuthResponse) {
    return this.externalCredentials.save({
      vendorId,
      vendorUserId: vendorRes.vendorUserId,
      vendorAccessToken: vendorRes.vendorAccessToken,
      vendorRefreshToken: vendorRes.vendorRefreshToken,
    })
  }
  
}
