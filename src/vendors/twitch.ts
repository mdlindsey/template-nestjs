import axios from 'axios'
import { CLIENT_HOST, Vendors } from 'src/config'

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET
const TWITCH_OAUTH_REDIRECT_URL = `${CLIENT_HOST}/oauth/twitch`

export class TwitchAPI {
    public static async OAuthAdapter(oauthCode:string) {
        try {
            const { identity, accessToken, refreshToken } = await TwitchAPI.OAuthExchange(oauthCode)
            return {
                vendorId: Vendors.Twitch,
                vendorRes: { identity, accessToken, refreshToken },
                vendorUserId: identity.id,
                vendorUserEmail: identity.email,
                vendorAvatarUrl: identity.avatar,
                vendorUserName: identity.username,
                vendorDisplayName: identity.username,
                vendorAccessToken: accessToken,
                vendorRefreshToken: refreshToken,
            }
        } catch(e) {
            return null
        }
    }
    private static async OAuthExchange(oauthCode:string) {
      const { accessToken, refreshToken } = await this.TokenExchange(oauthCode)
      const identity = await this.IdentityExchange(accessToken)
      return {
        identity,
        accessToken,
        refreshToken,
      }
    }
    private static async TokenExchange(oauthCode:string) {
      try {
        const params = {
          code: oauthCode,
          client_id: TWITCH_CLIENT_ID,
          client_secret: TWITCH_CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: TWITCH_OAUTH_REDIRECT_URL,
        }
        const paramStr = Object.keys(params).map(k => `${k}=${params[k]}`).join('&')
        const { data: { access_token, refresh_token } } = await axios.post(`https://id.twitch.tv/oauth2/token?${paramStr}`)
        return {
          accessToken: access_token,
          refreshToken: refresh_token,
        }
      } catch(e) {
        return null
      }
    }
    private static async IdentityExchange(accessToken:string) {
      try {
        const { data: { data: [user] } } = await axios.get('https://api.twitch.tv/helix/users', {
          headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`
          }
        })
        return {
          id: user.id,
          username: user.display_name,
          email: user.email,
          avatar: user.profile_image_url,
        }
      } catch(e) {
        return null
      }
    }
  }
