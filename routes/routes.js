const { body } = require("express-validator");

const router = require("express").Router();

const UserController = require("../controllers/UserController");
const ForeignAuthController = require("../controllers/ForeignAuthController");

const BlogController = require("../controllers/BlogController");
const OrderController = require("../controllers/OrderController");
const ReviewController = require("../controllers/ReviewController");
const CommentController = require("../controllers/CommentController");
const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");
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
router.get("/review/product/:id", ReviewController.getReviewsByProductId);
router.post("/review", ReviewController.createReview);
router.put("/review/:id", ReviewController.updateReview);
router.delete("/review/:id", ReviewController.deleteReview);

// Comment
router.get("/comment", CommentController.listComments);
router.get("/comment/:id", CommentController.getCommentById);
router.get("/comment/blog/:id", CommentController.getCommentsByBlogId);
router.post("/comment", CommentController.createComment);
router.put("/comment/:id", CommentController.updateComment);
router.delete("/comment/:id", CommentController.deleteComment);

//Subscribe
router.post("/newsletter/send", SubscriptionController.sendEmailNewsletter);
router.post("/newsletter/receiver", SubscriptionController.addNewReceiver);

//"/newsletter/contact-us"

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
router.get("/product/:id", ProductController.getProductById);

//Categories
router.get("/category", CategoryController.getAllCategories);
router.get("/category/:id", CategoryController.getCategoryById);

//Certificates
router.get("/certificate/:id", CertificateController.getCertificateById);

module.exports = router;
