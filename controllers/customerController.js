const customerService = require("../services/customerService");

class CustomerController {
  async listCustomers(req, res) {
    try {
      const customers = await customerService.listCustomers();
      res.send(customers);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getCustomerById(req, res) {
    try {
      const user = await customerService.getCustomerById(req.params.id);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

const customerController = new CustomerController();
module.exports = customerController;