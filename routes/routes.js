const OrderController = require("../controllers/orderController");
const ProductController = require("../controllers/productController");
const CustomerController = require("../controllers/customerController");
const CertificateController = require("../controllers/certificateController");

const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = require("express").Router();


//Authentification
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isString().isLength(6),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users/:email", authMiddleware, userController.getUsers);

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
router.get("/product", ProductController.getProducts);
router.get("/product/:id/metafields", ProductController.getProductWithMetafields);

//Certificates
router.get("/certificate/:id", CertificateController.getCertificateById);

module.exports = router;
