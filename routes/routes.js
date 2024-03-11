const OrderController = require("../controllers/orderController");
const ProductController = require("../controllers/productController");
const CustomerController = require("../controllers/customerController");
const CertificateController = require("../controllers/certificateController");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Hi, you need access for response of data...</h1>");
});

//Customers
router.get("/customer", CustomerController.listCustomers);
router.get("/customer/:id", CustomerController.getCustomerById);

//Orders
router.get("/order", OrderController.listOrders);
router.get("/order/:id", OrderController.getOrderById);
router.post("/order", OrderController.createOrder);
router.put("/order/:id", OrderController.updateOrder);
router.delete("/order/:id", OrderController.deleteOrder);

//Products
router.get("/product", ProductController.fetchProducts);
router.get("/product/:id/metafields", ProductController.getProductWithMetafields);

//Certificates
router.get("/certificate/:id", CertificateController.getCertificateById);

module.exports = router;
