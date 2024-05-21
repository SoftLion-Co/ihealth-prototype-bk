
module.exports = {
	async up(db, client) {
	  await db.createCollection('Review');
	  await db.createCollection('Comment');
	  await db.createCollection('Subscription');
	  await db.createCollection('Category');
	},
 
	async down(db, client) {
	  await db.collection('Review').drop();
	  await db.collection('Comment').drop();
	  await db.collection('Subscription').drop();
	  await db.collection('Category').drop();
	},
 };
 