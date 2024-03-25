const Subscription = require('../models/subscription');

class SubscriptionService {
	
	async SendEmailNewsletter(category, subject, text, html){
		try {
		  const subscriptions = await Subscription.find({ category: category });
  
		  for (const subscription of subscriptions) {
			 await MailSenderService.sendMail(subscription.email, subject, text, html);
			 console.log(`Newsletter sent to ${subscription.email}`);
		  }
		} catch (error) {
		  console.error('Error sending email newsletter:', error);
		  throw error;
		}
	 }
  

  async AddNewReceiver(category, receivedEmail){
    try {
      const newSubscription = new Subscription({
        email: receivedEmail,
        category: category,
        created_at: new Date() 
      });
      await newSubscription.save();

      console.log(`New receiver added to category "${category}": ${receivedEmail}`);
    } catch (error) {
      console.error('Error adding new receiver:', error);
      throw error;
    }
  }
}

const subscriptionService = new SubscriptionService();
module.exports = subscriptionService;
