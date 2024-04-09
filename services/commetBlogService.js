const Comment = require('./models/comment');

class CommentService {
  async listComments(limit = 5) {
    try {
      const comments = await Comment.find().limit(limit);
      return comments;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCommentById(commentId) {
    try {
      const comment = await Comment.findById(commentId);
      return comment;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createComment(commentData) {
    try {
      const newComment = new Comment(commentData);
      const savedComment = await newComment.save();
      return savedComment;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateComment(commentId, updatedData) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(commentId, updatedData, { new: true });
      return updatedComment;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteComment(commentId) {
    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      return deletedComment;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new CommentService();
