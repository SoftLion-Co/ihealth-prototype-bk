
module.exports = {
	async up(db, client) {
	  await db.createCollection('review');
	  await db.createCollection('comment');
	  await db.createCollection('subscription');
	  await db.createCollection('category');
	},
 
	async down(db, client) {
	  await db.collection('review').drop();
	  await db.collection('comment').drop();
	  await db.collection('subscription').drop();
	  await db.collection('category').drop();
	},
 };
 