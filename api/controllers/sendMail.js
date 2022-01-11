import nodemailer from 'nodemailer'
import {google} from 'googleapis'
const {OAuth2} = google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

import dotenv from 'dotenv'
dotenv.config()

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env


const oauth2Client = new google.auth.OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
    )
    oauth2Client.setCredentials({ refresh_token: MAILING_SERVICE_REFRESH_TOKEN})
    
    async function sendEmail(to, url, txt) {
        try {
            const accessToken = await oauth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'tmastervn@gmail.com',
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken: accessToken
        }
    })

    const mailOptions = {
        from: 'TMaster <tmastervn@gmail.com>',
        to: to,
        subject: "Xác nhận email",
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Chào mừng bạn đến với Tmaster</h2>
            <p>Xin chúc mừng! Bạn sẽ sẵn sàng tạo tài khoản tại TMASTER sau một vài thao tác.
                Chỉ cần kích vào nút xác nhận bên dưới.
            </p>

            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>Nếu nút xác nhận không hoạt động bạn có thể truy cập vào đường link bên dưới</p>
        
            <div>${url}</div>
            </div>
        `
    }

    transport.sendMail(mailOptions, (error, result) => {
        if(error) return error
        return result
    })
} catch (error) {
    return error
}}

export default sendEmail