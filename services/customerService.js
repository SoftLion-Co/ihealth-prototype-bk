const Shopify = require("shopify-api-node");
const shopifyService = require("../generic/service/shopifyService");

class CustomerService {
  async listCustomers(limit = 5) {
    try {
      const customers = await shopifyService.shopify.customer.list({ limit });
      return customers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCustomerById(userId) {
    try {
      const user = await shopifyService.shopify.customer.get(userId);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async createCustomer(params) {
    try {
      const user = await shopifyService.shopify.customer.create(params);
      return user.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const customerService = new CustomerService();
module.exports = customerService;
