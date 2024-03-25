const ShopifyService = require("../generic/service/shopifyService");

class CustomerService {
  async listCustomers(limit = 5) {
    try {
      const customers = await ShopifyService.shopify.customer.list({ limit });
      return customers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCustomerById(userId) {
    try {
      const user = await ShopifyService.shopify.customer.get(userId);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

const customerService = new CustomerService();
module.exports = customerService;