const { createTransport } = require("nodemailer");
const config = require("../config/config")

class MailSenderService {
	constructor(){
		this.transporter = createTransport({
			host: config.smtp.host,
			port: config.smtp.port,
			secure: false,
			auth: {
			  user: config.smtp.user,
			  pass: config.smtp.password,
			},
		 });
	}

  async sendMail(receivedMail, subject, text, html){
	 await this.transporter.sendMail({
      from: config.smtp.user,
      to: receivedMail,
      subject: subject,
      text: text,
      html: html,
    });
  }

  async sendActivationMail(receivedMail, link) {
    await this.sendMail(
		false, 
		receivedMail,  
		"Activate account on \t" + "IHealth",
		"",
		`
        <div>
          <h1>Your activation link</h1>
          <a href="${link}">${link}</a>
        </div>
        `
		);
  }
}

module.exports = new MailSenderService();
