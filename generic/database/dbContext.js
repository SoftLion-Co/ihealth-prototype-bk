const mongoose = require('mongoose');
const config = require('../../config/config');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.connect(config.database.url, config.database.options)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('Database connection error:', err));
  }
}

module.exports = new Database();
