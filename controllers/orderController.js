const orderService = require("../services/orderService");

class OrderController {

  async listOrders(req, res) {
    try {
      const orders = await orderService.listOrders();
      res.send(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      res.send(order);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async createOrder(req, res) {
    try {
      const createdOrder = await orderService.createOrder(req.body);
      res.send(createdOrder);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateOrder(req, res) {
    try {
      const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
      res.send(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteOrder(req, res) {
    try {
      await orderService.deleteOrder(req.params.id);
      res.send("Order deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

const orderController = new OrderController();
module.exports = orderController;