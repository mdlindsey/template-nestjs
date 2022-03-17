export enum UserLoginErrorCode {
    InvalidEmail = 'invalid-email',
    InvalidOAuth = 'invalid-oauth',
    UserNotFoundEmail = 'user-not-found-email',
    UserNotFoundOAuth = 'user-not-found-oauth',
}

export class AuthTokens {
    constructor() {}
}

// schema from ip-api.com
export type Location = {
    query: string
    status: string
    country: string
    countryCode: string
    region: string
    regionName: string
    city: string
    zip: string
    lat: number
    lon: number
    timezone: string
    isp: string
    org: string
    as: string
}

export type Device = {
    ua: string
    type: string
    brand: string
    name: string
    url: string
    os: Object
    device: Object
    browser: Object
    crawler: Object
}
