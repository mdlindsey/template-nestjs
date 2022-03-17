import axios from 'axios'
import * as qs from 'querystring'
import { CLIENT_HOST, Vendors } from 'src/config'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET
const DISCORD_OAUTH_REDIRECT_URL = `${CLIENT_HOST}/oauth/discord`

export class DiscordAPI {
  public static async OAuthAdapter(oauthCode:string) {
    const { identity, accessToken, refreshToken } = await DiscordAPI.OAuthExchange(oauthCode)
    return {
        vendorId: Vendors.Discord,
        vendorRes: { identity, accessToken, refreshToken },
        vendorUserId: identity.id,
        vendorUserEmail: identity.email,
        vendorAvatarUrl: !identity.avatar
          ? null
          : `https://cdn.discordapp.com/avatars/${identity.id}/${identity.avatar}.png`,
        vendorDisplayName: identity.tag,
        vendorAccessToken: accessToken,
        vendorRefreshToken: refreshToken,
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
  private static async TokenExchange(accessCode:string) {
    try {
      const { data: { access_token, refresh_token } } = await axios.post('https://discord.com/api/v6/oauth2/token', qs.stringify({
        code: accessCode,
        scope: 'identify',
        grant_type: 'authorization_code',
        redirect_uri: DISCORD_OAUTH_REDIRECT_URL,
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
      }))
      return { accessToken: access_token, refreshToken: refresh_token }
    } catch(e) {
      return null
    }
  }
  private static async IdentityExchange(accessToken:string) {
    const { data: { id, email, guilds, avatar, username, discriminator } } = await axios.get('https://discord.com/api/v6/users/@me', { headers: { 'Authorization': `Bearer ${accessToken}` } })
    return { id, email, guilds, tag: `${username}#${discriminator}`, avatar }
  }
}
