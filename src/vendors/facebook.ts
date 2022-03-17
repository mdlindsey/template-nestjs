import axios from 'axios'
import { CLIENT_HOST, Vendors } from 'src/config'

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET
const FACEBOOK_OAUTH_REDIRECT_URL = `${CLIENT_HOST}/oauth/facebook`

// Facebook does not use refresh tokens; instead if a user has used your app within
// the last 90 days, the access token will automatically have its expiration extended

export class FacebookAPI {
    public static async OAuthAdapter(oauthCode:string) {
        try {
            const { identity, accessToken } = await FacebookAPI.OAuthExchange(oauthCode)
            return {
                vendorId: Vendors.Facebook,
                vendorRes: { identity, accessToken, refreshToken: '' },
                vendorUserId: identity.id,
                vendorUserEmail: identity.email,
                vendorAvatarUrl: identity.picture,
                vendorDisplayName: identity.name,
                vendorAccessToken: accessToken,
                vendorRefreshToken: '',
            }
        } catch(e) {
            return null
        }
    }
    private static async OAuthExchange(oauthCode:string) {
        const { accessToken } = await this.TokenExchange(oauthCode)
        const identity = await this.IdentityExchange(accessToken)
        return {
            identity,
            accessToken,
        }
    }
    private static async TokenExchange(oauthCode:string) {
        const { data: { access_token } } = await axios.get(
            `https://graph.facebook.com/v11.0/oauth/access_token?`+
            `client_id=${FACEBOOK_CLIENT_ID}&`+
            `redirect_uri=${FACEBOOK_OAUTH_REDIRECT_URL}&`+
            `client_secret=${FACEBOOK_CLIENT_SECRET}&`+
            `code=${oauthCode}`
        )
        return { accessToken: access_token }
    }
    public static async IdentityExchange(accessToken:string) {
        const { data } = await axios.get(
            `https://graph.facebook.com/v3.1/me?`+
            `fields=email,id,picture,name&`+
            `access_token=${accessToken}`
        )
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            picture: data.picture?.data?.url
        }
    }
  }
