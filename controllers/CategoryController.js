const categoryService = require("../services/CategoryService");

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      res.send(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getCategoryById(req, res) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      res.send(category);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async createCategory(req, res) {
    try {
      const categoryData = req.body;
      const newCategory = await categoryService.createCategory(categoryData);
      res.status(201).send(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const updatedData = req.body;
      const updatedCategory = await categoryService.updateCategory(categoryId, updatedData);
      res.send(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async deleteCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const deletedCategory = await categoryService.deleteCategory(categoryId);
      res.send(deletedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new CategoryController();
