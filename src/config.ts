// dotenv hydration is called in main.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const IS_DEV = process.env.NODE_ENV === 'development'

// used for OAuth vendor redirect URL validation
export const CLIENT_HOST = IS_DEV ? 'http://localhost:3000' : 'https://mdlindsey-nextjs.vercel.app'

// see README for SSH tunneling instructions
const DB_HOST = IS_DEV ? '127.0.0.1' : process.env.DB_HOST
const DB_PORT = Number(process.env.DB_PORT || 5432)
export const DB_NAME = process.env.DB_NAME
export const ORM_CFG:TypeOrmModuleOptions = {
    type: 'postgres',
    port: DB_PORT,
    host: DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: DB_NAME,
    synchronize: IS_DEV, // do not use sychronize in production
    autoLoadEntities: true,
}

export const USERSTACK_API_KEY = process.env.USERSTACK_API_KEY
export const MAX_CONFIRMATION_CODE_ATTEMPTS = 5
export const CONFIRMATION_CODE_LENGTH = 5
export const SENDGRID_SENDER = process.env.SENDGRID_SENDER
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

export enum Vendors {
    Google = 'google',
    Microsoft = 'microsoft',
    Facebook = 'facebook',
    Twitch = 'twitch',
    Twitter = 'twitter',
    Discord = 'discord',
}

export const VendorOAuthURLs = {
    [Vendors.Google]: 'https://accounts.google.com/o/oauth2/v2/auth?'+
        'nonce=true&'+
        'response_type=code&'+
        'scope=email%20profile%20openid&openid.realm&'+
        `client_id=${process.env.GOOGLE_CLIENT_ID}`,
    [Vendors.Facebook]: `https://www.facebook.com/v11.0/dialog/oauth?`+
        `scope=email&`+
        `client_id=${process.env.FACEBOOK_CLIENT_ID}`,
    [Vendors.Microsoft]: `https://login.microsoftonline.com/${process.env.MICROSOFT_CLIENT_TENANT_ID}/oauth2/v2.0/authorize?`+
        'response_type=code&'+
        'scope=user.read%20openid%20profile&'+
        `client_id=${process.env.MICROSOFT_CLIENT_ID}&`+
        `nonce=true`,
    [Vendors.Discord]: `https://discord.com/api/oauth2/authorize?`+
        `client_id=${process.env.DISCORD_CLIENT_ID}&`+
        `response_type=code&scope=identify%20email%20guilds`,
    [Vendors.Twitch]: `https://id.twitch.tv/oauth2/authorize?`+
        `client_id=${process.env.TWITCH_CLIENT_ID}&`+
        `response_type=code&scope=user:read:email`,
    [Vendors.Twitter]: '',
}
