const dbContext = require('../generic/database/dbContext');
const Review = require('../models/reviewModel');

class ReviewService {

	async getReviewsByProductId(productId, limit = 10, page = 1) {
		try {
		  const filter = { product_id: productId };
		  const sort = { created_at: -1 };
		  const result = await dbContext.getAllData(Review.modelName, filter, page, limit, sort);
		  return result;
		} catch (err) {
		  console.error(`Error fetching reviews for product ${productId}:`, err);
		  throw err;
		}
	 }

  async listReviews(limit = 10, page = 1) {
    try {
      const filter = {};
      const sort = { created_at: -1 };
      const result = await dbContext.getAllData(Review.modelName, filter, page, limit, sort);
      return result;
    } catch (err) {
      console.error('Error fetching reviews:', err);
      throw err;
    }
  }

  async getReviewById(reviewId) {
    try {
      const review = await dbContext.getDataById(Review.modelName, reviewId);
      if (!review) {
        throw new Error('Review not found');
      }
      return review;
    } catch (err) {
      console.error(`Error fetching review ${reviewId}:`, err);
      throw err;
    }
  }

  async createReview(reviewData) {
    try {
      const review = await dbContext.createData(Review.modelName, reviewData);
      return review;
    } catch (err) {
      console.error('Error creating review:', err);
      throw err;
    }
  }

  async updateReview(reviewId, updatedData) {
    try {
      const updatedReview = await dbContext.updateData(Review.modelName, reviewId, updatedData);
      if (!updatedReview) {
        throw new Error('Review not found');
      }
      return updatedReview;
    } catch (err) {
      console.error(`Error updating review ${reviewId}:`, err);
      throw err;
    }
  }

  async deleteReview(reviewId) {
    try {
      const deletedReview = await dbContext.deleteData(Review.modelName, reviewId);
      if (!deletedReview) {
        throw new Error('Review not found');
      }
      return deletedReview;
    } catch (err) {
      console.error(`Error deleting review ${reviewId}:`, err);
      throw err;
    }
  }
}

module.exports = new ReviewService();
