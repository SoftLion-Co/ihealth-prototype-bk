const dbContext = require('../generic/database/dbContext');
const Category = require('../models/categoryModel');

class CategoryService {
  async getAllCategories(page = 1, limit = 20) {
    try {
      const filter = {};
      const sort = { created_at: -1 }; 
      const result = await dbContext.getAllData(Category.modelName, filter, page, limit, sort);
      return result;
    } catch (err) {
      console.error('Error fetching categories:', err);
      throw err;
    }
  }

  async getSearchCategories(title, limit = 8) {
	try {
	  const result = await dbContext.getDataByField(Category.modelName, 'subcategories.name', title, limit);
	  return result;
	} catch (err) {
	  console.error('Error fetching categories:', err);
	  throw err;
	}
 }

  async getCategoryById(id) {
    try {
      const category = await dbContext.getDataById(Category.modelName, id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (err) {
      console.error(`Error fetching category ${id}:`, err);
      throw err;
    }
  }

  async createCategory(categoryData) {
    try {
      const category = await dbContext.createData(Category.modelName, categoryData);
      return category;
    } catch (err) {
      console.error('Error creating category:', err);
      throw err;
    }
  }

  async updateCategory(id, categoryData) {
    try {
      const updatedCategory = await dbContext.updateData(Category.modelName, id, categoryData);
      if (!updatedCategory) {
        throw new Error('Category not found');
      }
      return updatedCategory;
    } catch (err) {
      console.error(`Error updating category ${id}:`, err);
      throw err;
    }
  }

  async deleteCategory(id) {
    try {
      const deletedCategory = await dbContext.deleteData(Category.modelName, id);
      if (!deletedCategory) {
        throw new Error('Category not found');
      }
      return deletedCategory;
    } catch (err) {
      console.error(`Error deleting category ${id}:`, err);
      throw err;
    }
  }
}

module.exports = new CategoryService();
