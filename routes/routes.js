const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const router = require("express").Router();

const BlogController = require("../controllers/blogController");
const OrderController = require("../controllers/orderController");
const ProductController = require("../controllers/productController");
const CustomerController = require("../controllers/customerController");
const CertificateController = require("../controllers/certificateController");
const SubscriptionController = require("../controllers/subscriptionController"); 

router.get("/", (req, res) => {
	res.send("Виберіть маршрут");
 });

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

// Review
router.get("/review", ReviewController.listReviews);
router.get("/review/:id", ReviewController.getReviewById);
router.post("/review", ReviewController.createReview);
router.put("/review/:id", ReviewController.updateReview);
router.delete("/review/:id", ReviewController.deleteReview);

// Comment
router.get("/comment", CommentController.listComments);
router.get("/comment/:id", CommentController.getCommentById);
router.post("/comment", CommentController.createComment);
router.put("/comment/:id", CommentController.updateComment);
router.delete("/comment/:id", CommentController.deleteComment);


//Subscribe
router.post("/newsletter/send", SubscriptionController.sendEmailNewsletter);
router.post("/newsletter/receiver", SubscriptionController.addNewReceiver);

//Customers
router.get("/customer", CustomerController.listCustomers);
router.get("/customer/:id", CustomerController.getCustomerById);

//Blogs
router.get("/blog", BlogController.getBlogs);
router.get("/blog/:id", BlogController.getBlogById);

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
