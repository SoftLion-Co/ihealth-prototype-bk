const CommentService = require("../services/СommetService");

class CommentController {
  async getCommentsByBlogId(req, res) {
    try {
      const blogId = req.params.blogId;
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const comments = await CommentService.getCommentsByBlogId(
        blogId,
        limit,
        page
      );
      res.send(comments);
    } catch (error) {
      console.error(
        `Error fetching comments for blog ${req.params.blogId}:`,
        error
      );
      res.status(500).send("Internal Server Error");
    }
  }

  async listComments(req, res) {
    try {
      const comments = await CommentService.listComments();
      res.send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getCommentById(req, res) {
    try {
      const comment = await CommentService.getCommentById(req.params.id);
      res.send(comment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async createComment(req, res) {
    try {
      const commentData = req.body;
      const newComment = await CommentService.createComment(commentData);
      res.status(201).send(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateComment(req, res) {
    try {
      const commentId = req.params.id;
      const updatedData = req.body;
      const updatedComment = await CommentService.updateComment(
        commentId,
        updatedData
      );
      res.send(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteComment(req, res) {
    try {
      const commentId = req.params.id;
      const deletedComment = await CommentService.deleteComment(commentId);
      res.send(deletedComment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new CommentController();
