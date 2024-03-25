const mongoose = require('mongoose');
const config = require('../../config/config');

class DBContext {
  connect() {
    mongoose.connect(config.database.url
		// , config.database.options
		)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('Database connection error:', err));
  }
}

const dbContext = new DBContext();
module.exports = dbContext;