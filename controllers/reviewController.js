const reviewService = require("../services/reviewService");

class ReviewController {
  async listReviews(req, res) {
    try {
      const reviews = await reviewService.listReviews();
      res.send(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getReviewById(req, res) {
    try {
      const review = await reviewService.getReviewById(req.params.id);
      res.send(review);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async createReview(req, res) {
    try {
      const reviewData = req.body;
      const newReview = await reviewService.createReview(reviewData);
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
      const updatedReview = await reviewService.updateReview(reviewId, updatedData);
      res.send(updatedReview);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteReview(req, res) {
    try {
      const reviewId = req.params.id;
      const deletedReview = await reviewService.deleteReview(reviewId);
      res.send(deletedReview);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new ReviewController();
