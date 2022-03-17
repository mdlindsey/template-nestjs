import { ConflictException, Injectable } from '@nestjs/common'
import { VendorOAuthResponse } from 'src/vendors'
import { Vendors } from 'src/config'
import { UserDAO } from './dao'
import * as User from './entities/user'

@Injectable()
export class UserService {
  constructor(
    private readonly userDAO:UserDAO,
  ) {}

  async createUser(user:Omit<User.Entity, 'id'>) {
    const existingAccount = await this.userDAO.getUserAccount(user)
    if (existingAccount) {
      throw new ConflictException('account already exists')
    }
    return this.userDAO.createUserAccount(user)
  }

  async createExternalAccount(user:User.Entity, vendorRes:VendorOAuthResponse) {
    return this.userDAO.createExternalAccount({
      userId: user.id,
      vendorId: vendorRes.vendorId,
      vendorUserId: vendorRes.vendorUserId,
      vendorUserEmail: vendorRes.vendorUserEmail,
      vendorAvatarUrl: vendorRes.vendorAvatarUrl,
      vendorDisplayName: vendorRes.vendorDisplayName,
    })
  }

  async removeExternalAccount(vendorId:Vendors, user:User.Entity) {
    return this.userDAO.removeExternalAccount({ vendorId, user })
  }

  async getUserAccount(identifier:Partial<User.Entity>):Promise<User.Entity> {
    return this.userDAO.getUserAccount(identifier)
  }

  async getUserAccountByExternal(vendorId: Vendors, vendorUserId: string) {
    return this.userDAO.getUserAccountByExternal({ vendorId, vendorUserId })
  }
  
}
