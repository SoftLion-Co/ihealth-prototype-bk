const config = {
	mongodb: {
	  db1: {
		 url: "mongodb://localhost:27017/Shop",
		 databaseName: "Shop",
		 options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		 },
	  },
	  db2: {
		 url: "mongodb://localhost:27017/PersonalInfo",
		 databaseName: "personalInformation",
		 options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		 },
	  },
	},
	migrationsDir: "migrations", 
	changelogCollectionName: "changelog", 
 };
 
module.exports = config;
 