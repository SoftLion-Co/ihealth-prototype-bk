require("dotenv").config();

module.exports = {
  server: {
    port: process.env.PORT || 3001,
    host: process.env.HOST || "localhost",
	 apiUrl: process.env.API_URL,
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

  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },

  auth:{
	 SecretKey: process.env.AUTH_SECRET_KEY,
	 Salt: process.env.SALT,
	 jwtRefreshKey: process.env.JWT_REFRESH_KEY,
	 jwtAccessKey: process.env.JWT_ACCESS_KEY,
  }
};
