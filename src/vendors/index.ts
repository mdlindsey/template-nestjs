import { DiscordAPI } from "./discord"
import { FacebookAPI } from "./facebook"
import { GoogleAPI } from "./google"
import { TwitchAPI } from "./twitch"

export enum Vendors {
    Google = 'google',
    Microsoft = 'microsoft',
    Facebook = 'facebook',
    Twitch = 'twitch',
    Twitter = 'twitter',
    Discord = 'discord',
}

export const VendorProfileVisibility = {
    [Vendors.Twitch]: true,
    [Vendors.Discord]: true,
    [Vendors.Twitter]: true,
}

export type VendorOAuthAdapterMap = Record<Vendors, (oauthCode:string)=>Promise<VendorOAuthResponse>>
export const VendorOAuthAdapters:VendorOAuthAdapterMap = {
    [Vendors.Google]: GoogleAPI.OAuthAdapter,
    [Vendors.Discord]: DiscordAPI.OAuthAdapter,
    [Vendors.Facebook]: FacebookAPI.OAuthAdapter,
    [Vendors.Twitch]: TwitchAPI.OAuthAdapter,
    [Vendors.Microsoft]: null,
    [Vendors.Twitter]: null,
}

export type VendorOAuthResponse = {
    vendorId: Vendors
    vendorRes: any
    vendorUserId: string
    vendorUserEmail: string
    vendorAvatarUrl: string
    vendorDisplayName: string
    vendorAccessToken: string
    vendorRefreshToken: string
}

