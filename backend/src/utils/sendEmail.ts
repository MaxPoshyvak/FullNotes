import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
    // debug: true, // Можеш розкоментувати для дебагу
    // logger: true,
});

export const sendMagicLinkEmail = async (email: string, link: string) => {
    try {
        const info = await transporter.sendMail({
            from: `"Notes App 📝" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🔐 Вхід у ваш акаунт',
            text: `Ваше посилання для входу: ${link}`, // Текстова версія
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Вхід у систему</title>
                <style>
                    /* Скидання стилів для поштовиків */
                    body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f7; }
                    table { border-collapse: collapse; width: 100%; }
                    
                    /* Адаптивність */
                    @media only screen and (max-width: 600px) {
                        .content-table { width: 100% !important; }
                        .padding-mobile { padding: 20px !important; }
                    }
                </style>
            </head>
            <body style="background-color: #f4f4f7; padding: 40px 0;">
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="600" class="content-table" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
                                
                                <tr>
                                    <td align="center" style="background-color: #2563EB; padding: 30px 0;">
                                        <div style="font-size: 48px;">📝</div>
                                        <h1 style="color: #ffffff; margin: 10px 0 0 0; font-size: 24px; font-weight: bold;">FullNotes</h1>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="padding-mobile" style="padding: 40px;">
                                        <h2 style="color: #333333; font-size: 20px; margin-top: 0;">Привіт! 👋</h2>
                                        <p style="color: #666666; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
                                            Ми отримали запит на вхід у ваш акаунт. Щоб продовжити, просто натисніть кнопку нижче. Пароль вводити не потрібно.
                                        </p>

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td align="center">
                                                    <a href="${link}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 8px; background-color: #2563EB; font-weight: bold; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);">
                                                        Увійти в акаунт &rarr;
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="color: #666666; font-size: 14px; line-height: 24px; margin-top: 30px;">
                                            Це посилання дійсне протягом <strong>15 хвилин</strong>. Якщо ви не надсилали цей запит, можете сміливо ігнорувати цей лист.
                                        </p>

                                        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">

                                        <p style="color: #999999; font-size: 12px; line-height: 18px; margin-bottom: 10px;">
                                            Якщо кнопка не працює, скопіюйте це посилання у браузер:
                                        </p>
                                        <p style="color: #2563EB; font-size: 11px; word-break: break-all; line-height: 1.4;">
                                            <a href="${link}" style="color: #2563EB; text-decoration: none;">${link}</a>
                                        </p>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" style="background-color: #f9fafb; padding: 20px; color: #9ca3af; font-size: 12px;">
                                        &copy; ${new Date().getFullYear()} Notes App. Всі права захищено.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

            </body>
            </html>
            `,
        });

        console.log('✅ Email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('❌ Email Error:', error);
        return false;
    }
};
