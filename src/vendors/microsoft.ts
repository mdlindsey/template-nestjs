import * as msal from '@azure/msal-node'
import { CLIENT_HOST } from 'src/config'

const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID
const MICROSOFT_CLIENT_TENANT_ID = process.env.MICROSOFT_CLIENT_TENANT_ID
const MICROSOFT_OAUTH_REDIRECT_URL = `${CLIENT_HOST}/oauth/microsoft`
const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET

export class MicrosoftAPI {
    private static readonly cca = new msal.ConfidentialClientApplication({
        auth: {
            clientId: MICROSOFT_CLIENT_ID,
            authority: "https://login.microsoftonline.com/"+MICROSOFT_CLIENT_TENANT_ID,
            clientSecret: MICROSOFT_CLIENT_SECRET
        },
        system: {
            loggerOptions: {
                loggerCallback(loglevel, message, containsPii) {
                    // console.log('msal:', message);
                },
                piiLoggingEnabled: false,
                logLevel: msal.LogLevel.Verbose,
            }
        }
    })
    public static async OAuthExchange(oauthCode:string) {
        try {
            const tokenRequest = {
                code: oauthCode,
                scopes: ["user.read"],
                redirectUri: MICROSOFT_OAUTH_REDIRECT_URL,
            }
            return this.cca.acquireTokenByCode(tokenRequest)
        } catch(e) {
            return null
        }
    }
    public static async OAuthRefresh(refreshToken:string) {
        try {
            const tokenRequest = {
                refreshToken,
                scopes: ["user.read"],
                redirectUri: "http://localhost:3000/oauth/microsoft",
            }
            return this.cca.acquireTokenByRefreshToken(tokenRequest)
        } catch(e) {
            return null
        }
    }
}
