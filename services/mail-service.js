const { createTransport } = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: "Activate account on \t" + process.env.API_URL,
      text: "",
      html: `
        <div>
          <h1>Your activation link</h1>
          <a href="${link}">${link}</a>
        </div>
        `,
    });
  }
}

module.exports = new MailService();