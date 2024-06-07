const BlogService = require("../services/BlogService");

class BlogController {
  async getBlogById(req, res) {
    try {
      const blog = await BlogService.getBlogById(req.params.id);
      res.send(blog);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getBlogs(req, res) {
    try {
      const blogs = await BlogService.getBlogs();
      res.send(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getLatestBlogPosts(req, res) {
	try {
	  const blogs = await BlogService.getLatestBlogPosts();
	  res.send(blogs);
	} catch (error) {
	  console.error(error);
	  res.status(500).send("Internal Server Error");
	}
 }
}

const blogController = new BlogController();
module.exports = blogController;
