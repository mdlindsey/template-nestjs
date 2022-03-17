export class MailTemplates {
    public static Confirm(accessCode:string) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <body
                style="
                font-family: sans-serif;
                padding: 0 24px;
                max-width: 768px;
                margin: 0 auto;
                text-align: center;
                "
            >
                <header>
                <a href="https://iam.gg">
                    <img
                    alt="IAM.GG"
                    src="https://iam.gg/icons/iam.png"
                    style="
                        display: inline-block;
                        width: 25vw;
                        height: 25vw;
                        max-width: 96px;
                        max-height: 96px;
                        border-radius: 50%;
                    "
                    />
                </a>
                </header>
                <main>
                <h3 style="font-size: 20px; text-align: center;">
                    Here's your access code:
                </h3>
                <p style="font-size: 32px; letter-spacing: 8px; font-weight: 600; padding: 16px; border-radius: 10px; background: #eee;">
                    ${accessCode}
                </p>
                <p style="font-size: 16px;">
                    Enter the access code shown above where you recently attempted to login.
                </p>
                </main>
                <footer>
                <p style="font-size: 12px; color: #aaa; line-height: 1.8rem;">
                    If you were not expecting this email please
                    <a href="https://iam.gg/hijacked/${accessCode}">let us know</a>.
                </p>
                </footer>
            </body>
            </html>
        `        
    }
}