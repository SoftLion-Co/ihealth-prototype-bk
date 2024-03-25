const subscriptionService = require("../services/subscriptionService");

class SubscriptionController {
  async sendEmailNewsletter(req, res) {
    const { category, subject, text, html } = req.body;
    try {
      await subscriptionService.SendEmailNewsletter(category, subject, text, html);
      res.status(200).send("Email newsletter sent successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async addNewReceiver(req, res) {
    const { category, email } = req.body;
    try {
      await subscriptionService.AddNewReceiver(category, email);
      res.status(201).send("New receiver added successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

const subscriptionController = new SubscriptionController();
module.exports = subscriptionController;
