import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { CLIENT_HOST, Vendors } from 'src/config'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_OAUTH_REDIRECT = `${CLIENT_HOST}/oauth/google`

export class GoogleAPI {
    private static readonly authClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
    private static readonly apisClient = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_OAUTH_REDIRECT)

    public static async OAuthAdapter(oauthCode:string) {
        try {
            const { identity, accessToken, refreshToken } = await GoogleAPI.OAuthExchange(oauthCode)
            return {
                vendorId: Vendors.Google,
                vendorRes: { identity, accessToken, refreshToken },
                vendorUserId: identity.sub,
                vendorUserEmail: identity.email,
                vendorAvatarUrl: identity.picture,
                vendorDisplayName: identity.name,
                vendorAccessToken: accessToken,
                vendorRefreshToken: refreshToken || '',
            }
        } catch(e) {
            return null
        }
    }

    private static async OAuthExchange(oauthCode:string) {
        const { tokens: { access_token, refresh_token, id_token } } = await this.apisClient.getToken(oauthCode)
        const ticket = await this.authClient.verifyIdToken({ idToken: id_token, audience: GOOGLE_CLIENT_ID })
        return {
            identity: ticket.getPayload(),
            accessToken: access_token,
            refreshToken: refresh_token,
        }
    }
}
