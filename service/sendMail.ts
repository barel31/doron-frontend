import nodemailer, { SendMailOptions } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_EMAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function createEmailTemplate(data: MailData): string {
  return `<div style="background: linear-gradient(0deg, rgba(78, 78, 78, 1) 0%, rgba(32, 32, 32, 1) 100%);
	text-align:center;color:#cec6c6;font-family:'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif;"
	dir="rtl"><h1>${process.env.EMAIL_SUBJECT}</h1><h2>שם: ${
    data.name
  }</h2><h2>טלפון: ${data.tel}</h2><h2>אימייל: ${data.email}</h2>${
    data.message ? `<h2>הודעה: ${data.message}</h2>` : ''
  }</div>`;
}

export default async function sendMail(data: MailData): Promise<MailResponse> {
  const message: SendMailOptions = {
    from: data.email,
    to: process.env.GMAIL_EMAIL_ADDRESS,
    subject: process.env.EMAIL_SUBJECT,
    text: `שם: ${data.name}\yטלפון: ${data.tel}\nאימייל: ${data.email}${
      data.message ? `\nהודעה: ${data.message}` : ''
    }`,
    html: createEmailTemplate(data),
  };

  try {
    const info: SMTPTransport.SentMessageInfo = await new Promise(
      (resolve, reject) => {
        transporter.sendMail(message, (err, info) => {
          if (err) reject(err);
          else resolve(info);
        });
      }
    );

    return { success: true, info };
  } catch (err) {
    console.error(err);
    return { success: false, err: err as Error };
  }
}
