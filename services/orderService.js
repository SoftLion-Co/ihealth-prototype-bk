const ShopifyService = require("../generic/service/shopifyService");

class OrderService {
  async listOrders(limit = 5) {
    try {
      const orders = await ShopifyService.shopify.order.list({ limit });
      return orders;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await ShopifyService.shopify.order.get(orderId);
      return order;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createOrder(orderData) {
	try {
	   const createdOrder = await ShopifyService.shopify.order.create(orderData);
	   return createdOrder;
	} catch (error) {
	  console.error(error);
	  throw error;
	}
 }

 async updateOrder(orderId, updatedOrderData) {
	try {
	  const updatedOrder = await ShopifyService.shopify.order.update(orderId, updatedOrderData);
	  return updatedOrder;
	} catch (error) {
	  console.error(error);
	  throw error;
	}
 }

}

const orderService = new OrderService();
module.exports = orderService;