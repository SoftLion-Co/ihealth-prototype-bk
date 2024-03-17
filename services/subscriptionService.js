const MailSenderService = require("./mailSenderService");
const config = require("../config/config")

class SubscriptionService {
	constructor(){
		
	}

  async SendEmailNewsletter(receivedMail, subject, text, html){
	 
  }

}

const subscriptionService = new SubscriptionService();
module.exports = subscriptionService;