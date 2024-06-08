const Subscription = require("../models/subscriptionModel");

class SubscriptionService {
  async SendEmailNewsletter(category, subject, text, html) {
    try {
      const subscriptions = await Subscription.find({ category: category });

      for (const subscription of subscriptions) {
        await MailSenderService.sendMail(
          subscription.email,
          subject,
          text,
          html
        );
        console.log(`Newsletter sent to ${subscription.email}`);
      }
    } catch (error) {
      console.error("Error sending email newsletter:", error);
      throw error;
    }
  }

  async addNewReceiver(category, receivedEmail) {
    try {
      const newSubscription = {
        email: receivedEmail,
        category: category,
        created_at: new Date(),
      };
      const savedSubscription = await dbContext.createData(
        Subscription.modelName,
        newSubscription
      );

      console.log(
        `New receiver added to category "${category}": ${receivedEmail}`
      );
      return savedSubscription;
    } catch (error) {
      console.error("Error adding new receiver:", error);
      throw error;
    }
  }
}

module.exports = new SubscriptionService();
