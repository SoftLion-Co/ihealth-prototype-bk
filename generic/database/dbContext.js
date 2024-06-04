const mongoose = require("mongoose");
const config = require("../../config/config");

class DBContext {
  async connect() {
    await mongoose
      .connect(config.database.uri)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Database connection error:", err));
  }

  async getDataById(model, id) {
    try {
      const Model = mongoose.model(model);
      const data = await Model.findById(id);
      return data;
    } catch (err) {
      console.error(`Error retrieving data from ${model}:`, err);
      throw err;
    }
  }

  async getAllData(model, filter = {}, page = 1, limit = 20, sort = {}) {
    try {
      const Model = mongoose.model(model);
      const skip = (page - 1) * limit;
      const data = await Model.find(filter).skip(skip).limit(limit).sort(sort);
      const total = await Model.countDocuments(filter);
      return { data, total, page, limit };
    } catch (err) {
      console.error(`Error retrieving data from ${model}:`, err);
      throw err;
    }
  }

  async createData(model, data) {
    try {
      const Model = mongoose.model(model);
      const newData = new Model(data);
      return await newData.save();
    } catch (err) {
      console.error(`Error creating data in ${model}:`, err);
      throw err;
    }
  }

  async updateData(model, id, data) {
    try {
      const Model = mongoose.model(model);
      return await Model.findByIdAndUpdate(id, data, { new: true });
    } catch (err) {
      console.error(`Error updating data in ${model}:`, err);
      throw err;
    }
  }

  async deleteData(model, id) {
    try {
      const Model = mongoose.model(model);
      return await Model.findByIdAndDelete(id);
    } catch (err) {
      console.error(`Error deleting data from ${model}:`, err);
      throw err;
    }
  }
}

const dbContext = new DBContext();
module.exports = dbContext;
