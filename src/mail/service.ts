import * as sendGrid from '@sendgrid/mail'
import { MailTemplates } from './template' 

export class MailService {
    private static async SendGeneric(to:string, subject:string, html:string) {
        sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
        return sendGrid.send({
            to,
            subject,
            html,
            from: process.env.SENDGRID_SENDER,
        })
    }
    public static async SendConfirmation(email:string, code:string) {
        return this.SendGeneric(email, 'IAM.GG Confirmation Code', MailTemplates.Confirm(code))
    }
}
