const commentService = require("../services/commentService");

class CommentController {
  async listComments(req, res) {
    try {
      const comments = await commentService.listComments();
      res.send(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getCommentById(req, res) {
    try {
      const comment = await commentService.getCommentById(req.params.id);
      res.send(comment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async createComment(req, res) {
    try {
      const commentData = req.body;
      const newComment = await commentService.createComment(commentData);
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
      const updatedComment = await commentService.updateComment(commentId, updatedData);
      res.send(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteComment(req, res) {
    try {
      const commentId = req.params.id;
      const deletedComment = await commentService.deleteComment(commentId);
      res.send(deletedComment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new CommentController();
