import * as qs from 'querystring'
import { CLIENT_HOST } from 'src/config'
import { http } from 'src/util/http'

const EPIC_CLIENT_ID = process.env.EPIC_CLIENT_ID
const EPIC_CLIENT_SECRET = process.env.EPIC_CLIENT_SECRET
const EPIC_OAUTH_REDIRECT = `${CLIENT_HOST}/oauth/epic`
const EPIC_DEPLOYMENT_ID = process.env.EPIC_DEPLOYMENT_ID

export class EpicAPI {
    private static async TokenRequest({
        code,
        grant_type,
        refresh_token,
    }:{
        grant_type:'authorization_code'|'refresh_token',
        code?: string
        refresh_token?: string
    }) {
        const { data } = await http.post('https://api.epicgames.dev/epic/oauth/v1/token', qs.stringify({
            code,
            grant_type,
            refresh_token,
            scope:'basic_profile friends presence',
            deployment_id: EPIC_DEPLOYMENT_ID,
            redirect_uri: EPIC_OAUTH_REDIRECT,
        }), {
            headers: {
                Authorization: `Basic ${Buffer.from(`${EPIC_CLIENT_ID}:${EPIC_CLIENT_SECRET}`).toString('base64')}`
            }
        })
        return data
    }
    
    public static async OAuthExchange(oauthCode:string) {
        return this.TokenRequest({ code: oauthCode, grant_type: 'authorization_code' })
    }

    public static async RefreshTokens(refresh_token:string) {
        return this.TokenRequest({ code: refresh_token, grant_type: 'refresh_token' })
    }
}
