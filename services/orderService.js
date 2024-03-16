const ShopifyService = require("../generic/service/shopifyService");
const Order = require('../models/order');

class OrderService {
  async listOrders(limit = 5) {
    try {
      const orders = await ShopifyService.shopify.draftOrder.list({ limit });
      return orders;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await ShopifyService.shopify.draftOrder.get(orderId);
      return order;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createOrder(orderData) {
    try {
      const createdOrder = await ShopifyService.shopify.draftOrder.create(orderData);
      const order = new Order(createdOrder);
      await order.save();
      return createdOrder;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateOrder(orderId, updatedOrderData) {
    try {
      const updatedOrder = await ShopifyService.shopify.draftOrder.update(
        orderId,
        updatedOrderData
      );
      await Order.findOneAndUpdate({ orderId }, updatedOrderData, {
        new: true,
      });
      return updatedOrder;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      await this.shopifyService.shopify.draftOrder.delete(orderId);
      await Order.findOneAndDelete({ orderId });
      return "Order deleted successfully";
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }
}

const orderService = new OrderService();
module.exports = orderService;
