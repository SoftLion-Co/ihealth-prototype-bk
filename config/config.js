require("dotenv").config();

module.exports = {
  server: {
    port: /* process.env.PORT ||  */ 5000,
    host: process.env.HOST || "localhost",
    apiUrl: process.env.API_URL,
  },

  database: {
    url: process.env.DB_URL,
    uri: process.env.DB_URI,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    mongoUri: process.env.MONGO_URI,
  },

  shopify: {
    shopName: process.env.SHOP_NAME,
    apiKey: process.env.API_KEY,
    apiSecretKey: process.env.API_SECRET_KEY,
    password: process.env.API_ACCESS_TOKEN,
  },

  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },

  auth: {
    SecretKey: process.env.AUTH_SECRET_KEY,
    Salt: process.env.SALT,
    jwtRefreshKey: process.env.JWT_REFRESH_KEY,
    jwtAccessKey: process.env.JWT_ACCESS_KEY,
  },
};
