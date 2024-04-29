const Review = require('./models/review');

class ReviewService {
  async listReviews(limit = 5) {
    try {
      const reviews = await Review.find().limit(limit);
      return reviews;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getReviewById(reviewId) {
    try {
      const review = await Review.findById(reviewId);
      return review;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createReview(reviewData) {
    try {
      const newReview = new Review(reviewData);
      const savedReview = await newReview.save();
      return savedReview;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateReview(reviewId, updatedData) {
    try {
      const updatedReview = await Review.findByIdAndUpdate(reviewId, updatedData, { new: true });
      return updatedReview;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteReview(reviewId) {
    try {
      const deletedReview = await Review.findByIdAndDelete(reviewId);
      return deletedReview;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new ReviewService();
