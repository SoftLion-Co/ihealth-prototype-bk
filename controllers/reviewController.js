const ReviewService = require("../services/ReviewService");

class ReviewController {
	async getReviewsByProductId(req, res) {
		try {
		  const productId = req.params.productId;
		  const limit = parseInt(req.query.limit) || 10;
		  const page = parseInt(req.query.page) || 1;
		  const reviews = await ReviewService.getReviewsByProductId(productId, limit, page);
		  res.send(reviews);
		} catch (error) {
		  console.error(`Error fetching reviews for product ${req.params.productId}:`, error);
		  res.status(500).send("Internal Server Error");
		}
	 }
	 
  async listReviews(req, res) {
    try {
      const reviews = await ReviewService.listReviews();
      res.send(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getReviewById(req, res) {
    try {
      const review = await ReviewService.getReviewById(req.params.id);
      res.send(review);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async createReview(req, res) {
    try {
      const reviewData = req.body;
      const newReview = await ReviewService.createReview(reviewData);
      res.status(201).send(newReview);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateReview(req, res) {
    try {
      const reviewId = req.params.id;
      const updatedData = req.body;
      const updatedReview = await ReviewService.updateReview(reviewId, updatedData);
      res.send(updatedReview);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteReview(req, res) {
    try {
      const reviewId = req.params.id;
      const deletedReview = await ReviewService.deleteReview(reviewId);
      res.send(deletedReview);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new ReviewController();
