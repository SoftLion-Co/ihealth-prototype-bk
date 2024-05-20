const { body } = require("express-validator");

const router = require("express").Router();

const UserController = require("../controllers/UserController");
const ForeignAuthController = require("../controllers/ForeignAuthController");

const CommentController = require("../controllers/CommentController")
const ReviewController = require("../controllers/ReviewController");
const BlogController = require("../controllers/BlogController");
const OrderController = require("../controllers/OrderController");
const ProductController = require("../controllers/ProductController");
const CustomerController = require("../controllers/CustomerController");
const CertificateController = require("../controllers/CertificateController");
const SubscriptionController = require("../controllers/SubscriptionController"); 

router.get("/", (req, res) => {
	res.send("Виберіть маршрут");
 });

//Authentification
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isString().isLength(6),
  UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users/:email", UserController.getUsers);
router.get("/auth/google", ForeignAuthController.google);
router.get("/auth/github", ForeignAuthController.github);

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
router.get("/blog/top", BlogController.getLatestBlogPosts);
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
