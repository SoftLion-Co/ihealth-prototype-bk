const Shopify = require("shopify-api-node");
const config = require("../../config/config");

class ShopifyService {
  constructor() {
    this.shopify = this.createShopify();
  }

  createShopify() {
    return new Shopify({
      shopName: config.shopify.shopName,
      apiKey: config.shopify.apiKey,
      password: config.shopify.password,
    });
  }
}

const shopifyService = new ShopifyService();
module.exports = shopifyService;
