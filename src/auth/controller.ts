import {
    Req,
    Get,
    Put,
    Post,
    Body,
    Param,
    Delete,
    Controller,
    BadRequestException,
    UnauthorizedException,
    NotFoundException,
    ConflictException,
} from '@nestjs/common'
import { AuthService } from './service'
import { verifyJwt } from 'src/util/jwt'
import { UserService } from 'src/users/service'
import { VendorOAuthURLs } from 'src/config'
import type { CustomRequest, UserRequest } from 'src/util/middleware'
import { VendorOAuthAdapters, Vendors, type VendorOAuthResponse } from 'src/vendors'

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly userService:UserService,
        private readonly authService:AuthService,
    ) {}

    private async UseVendorOAuth(vendorId:Vendors, base64OAuthCode:string) {
        if (!VendorOAuthAdapters[vendorId]) {
            throw new BadRequestException('invalid vendor')
        }
        const oauthCode = Buffer.from(base64OAuthCode, 'base64').toString('ascii')
        const vendorRes = await VendorOAuthAdapters[vendorId](oauthCode)
        if (!vendorRes) {
            throw new UnauthorizedException('vendor rejection')
        }
        return vendorRes
    }

    @Post('/')
    async UserRegistration(@Body() { registrationToken, username }) {
        const registrant = verifyJwt<{ email?:string } & VendorOAuthResponse>(registrationToken)
        if (!registrant) {
            throw new UnauthorizedException('invalid registrant')
        }
        const accountScaffold = { username, email: registrant.email }
        if (!accountScaffold.email) {
            accountScaffold.email = registrant.vendorUserEmail
        }
        const existingUsername = await this.userService.getUserAccount({ username: accountScaffold.username })
        if (existingUsername) {
            throw new ConflictException('username already exists')
        }
        const existingEmail = await this.userService.getUserAccount({ email: accountScaffold.email })
        if (existingEmail) {
            throw new ConflictException('email already exists')
        }
        const createdUser = await this.userService.createUser({ email: accountScaffold.email, username })
        if (registrant.vendorUserId) {
            await this.userService.createExternalAccount(createdUser, registrant)
        }
        const userAccount = await this.userService.getUserAccount({ id: createdUser.id })
        return this.authService.issueAccountTokens(userAccount)
    }

    @Post('/email/login')
    async InitLoginEmailConfirmation(@Body() { email }) {
        const user = await this.userService.getUserAccount({ email })
        if (!user) {
            throw new ConflictException('account not found')
        }
        const code = await this.authService.initEmailVerification(email)
        return { success: true }
    }

    @Post('/email/signup')
    async InitSignUpEmailConfirmation(@Body() { email }) {
        const user = await this.userService.getUserAccount({ email })
        if (user) {
            throw new ConflictException('account already exists')
        }
        const code = await this.authService.initEmailVerification(email)
        return { success: true }
    }

    @Post('/email/login/:code')
    async CompleteEmailLogin(@Req() req: CustomRequest, @Param() { code }, @Body() { email }) {
        const user = await this.userService.getUserAccount({ email })
        if (!user) {
            throw new ConflictException('account not found')
        }
        const loginAttempt = {
            ip: req.ipAddr,
            userAgent: req.headers['user-agent'],
            success: false,
        }
        const valid = await this.authService.completeEmailVerification(email, code)
        if (!valid) {
            await this.authService.createLoginAttempt({
                ...loginAttempt,
                userId: user.id,
            })
            throw new UnauthorizedException('invalid confirmation code')
        }
        await this.authService.createLoginAttempt({
            ...loginAttempt,
            success: true,
            userId: user.id,
        })
        return this.authService.issueAccountTokens(user)
    }

    @Post('/email/signup/:code')
    async CompleteEmailSignUp(@Param() { code }, @Body() { email }) {
        const user = await this.userService.getUserAccount({ email })
        if (user) {
            throw new ConflictException('account already exists')
        }
        const valid = await this.authService.completeEmailVerification(email, code)
        if (!valid) {
            throw new UnauthorizedException('invalid confirmation code')
        }
        return this.authService.issueRegistrationToken({ email })
    }

    @Get('/vendors')
    async GetOAuthVendors() {
        return [
            {
                vendorId: Vendors.Google,
                vendorName: 'Google',
                brandIcon: ':icon-google',
                brandColor: '#4285f4',
                redirectUrl: VendorOAuthURLs[Vendors.Google],
            },
            {
                vendorId: Vendors.Facebook,
                vendorName: 'Facebook',
                brandIcon: ':icon-facebook',
                brandColor: '#3b5998',
                redirectUrl: VendorOAuthURLs[Vendors.Facebook],
            },
            // {
            //     vendorId: Vendors.Microsoft,
            //     vendorName: 'Microsoft',
            //     brandIcon: '/icons/microsoft.svg',
            //     brandColor: '#333',
            //     redirectUrl: VendorOAuthURLs[Vendors.Microsoft],
            // },
            {
                vendorId: Vendors.Discord,
                vendorName: 'Discord',
                brandIcon: ':icon-discord',
                brandColor: '#5a67d8',
                redirectUrl: VendorOAuthURLs[Vendors.Discord],
            },
            {
                vendorId: Vendors.Twitch,
                vendorName: 'Twitch',
                brandIcon: ':icon-twitch',
                brandColor: '#6441A4',
                redirectUrl: VendorOAuthURLs[Vendors.Twitch],
            },
            // {
            //     vendorId: Vendors.Twitter,
            //     vendorName: 'Twitter',
            //     brandIcon: ':icon-twitter',
            //     brandColor: '#2DAAE1',
            //     redirectUrl: VendorOAuthURLs[Vendors.Twitter],
            // }
        ]
    }

    @Put('/vendor/:vendorId/:base64OAuthCode')
    async OAuthAccountLink(@Req() req:UserRequest, @Param() { vendorId, base64OAuthCode }) {
        const vendorRes = await this.UseVendorOAuth(vendorId, base64OAuthCode)
        await this.authService.saveVendorCredentials(vendorId, vendorRes)
        const userAccount = await this.userService.getUserAccount({ id: req.user.id })
        return this.authService.issueAccountTokens(userAccount)
    }

    @Get('/vendor/:vendorId/:base64OAuthCode')
    async OAuthLogin(@Req() req: CustomRequest, @Param() { vendorId, base64OAuthCode }) {
        const vendorRes = await this.UseVendorOAuth(vendorId, base64OAuthCode)
        await this.authService.saveVendorCredentials(vendorId, vendorRes)
        let userAccount = await this.userService.getUserAccountByExternal(vendorId, vendorRes.vendorUserId)
        if (!userAccount) {
            userAccount = await this.userService.getUserAccount({ email: vendorRes.vendorUserEmail })
            if (userAccount) {
                await this.userService.createExternalAccount(userAccount, vendorRes)
                userAccount = await this.userService.getUserAccountByExternal(vendorId, vendorRes.vendorUserId)
            }
        }
        const loginAttempt = {
            ip: req.ipAddr,
            userAgent: req.headers['user-agent'],
            vendorId,
            success: false,
            metadata: vendorRes,
        }
        if (!userAccount) {
            await this.authService.createLoginAttempt(loginAttempt)
            throw new NotFoundException('user not found')
        }
        await this.authService.createLoginAttempt({
            ...loginAttempt,
            success: true,
            userId: userAccount.id,
        })
        await this.authService.saveVendorCredentials(vendorId, vendorRes)
        return this.authService.issueAccountTokens(userAccount)
    }

    @Post('/vendor/:vendorId/:base64OAuthCode')
    async OAuthSignUp(@Param() { vendorId, base64OAuthCode }) {
        const vendorRes = await this.UseVendorOAuth(vendorId, base64OAuthCode)
        let userAccount = await this.userService.getUserAccountByExternal(vendorId, vendorRes.vendorUserId)
        if (userAccount) {
            throw new ConflictException('user already exists')
        }
        await this.authService.saveVendorCredentials(vendorId, vendorRes)
        return this.authService.issueRegistrationToken(vendorRes)
    }

    @Delete('/vendor/:vendorId')
    async OAuthAccountUnlink(@Req() req:UserRequest, @Param() { vendorId }) {
        await this.userService.removeExternalAccount(vendorId, req.user)
        const userAccount = await this.userService.getUserAccount({ id: req.user.id })
        return this.authService.issueAccountTokens(userAccount)
    }
}
