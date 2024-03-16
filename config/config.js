require("dotenv").config();

module.exports = {
  server: {
    port: process.env.PORT || 3001,
    host: process.env.HOST || "localhost",
  },

  database: {
    url: process.env.DB_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },

  shopify: {
    shopName: process.env.SHOP_NAME,
    apiKey: process.env.API_KEY,
    password: process.env.PASSWORD,
  },
};
