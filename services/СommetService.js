const dbContext = require("../generic/database/dbContext");
const Comment = require("../models/commentModel");

class CommentService {
  async listComments(limit = 10, page = 1) {
    try {
      const filter = {};
      const sort = { created_at: -1 };
      const result = await dbContext.getAllData(
        Comment.modelName,
        filter,
        page,
        limit,
        sort
      );
      return result;
    } catch (err) {
      console.error("Error fetching comments:", err);
      throw err;
    }
  }

  async getCommentById(commentId) {
    try {
      const comment = await dbContext.getDataById(Comment.modelName, commentId);
      if (!comment) {
        throw new Error("Comment not found");
      }
      return comment;
    } catch (err) {
      console.error(`Error fetching comment ${commentId}:`, err);
      throw err;
    }
  }

  async createComment(commentData) {
    try {
      const comment = await dbContext.createData(
        Comment.modelName,
        commentData
      );
      return comment;
    } catch (err) {
      console.error("Error creating comment:", err);
      throw err;
    }
  }

  async updateComment(commentId, updatedData) {
    try {
      const updatedComment = await dbContext.updateData(
        Comment.modelName,
        commentId,
        updatedData
      );
      if (!updatedComment) {
        throw new Error("Comment not found");
      }
      return updatedComment;
    } catch (err) {
      console.error(`Error updating comment ${commentId}:`, err);
      throw err;
    }
  }

  async deleteComment(commentId) {
    try {
      const deletedComment = await dbContext.deleteData(
        Comment.modelName,
        commentId
      );
      if (!deletedComment) {
        throw new Error("Comment not found");
      }
      return deletedComment;
    } catch (err) {
      console.error(`Error deleting comment ${commentId}:`, err);
      throw err;
    }
  }

  async getCommentsByBlogId(blogId, limit = 10, page = 1) {
    try {
      const filter = { blog_id: blogId };
      const sort = { created_at: -1 };
      const result = await dbContext.getAllData(
        Comment.modelName,
        filter,
        page,
        limit,
        sort
      );
      return result;
    } catch (err) {
      console.error(`Error fetching comments for blog ${blogId}:`, err);
      throw err;
    }
  }
}

module.exports = new CommentService();
