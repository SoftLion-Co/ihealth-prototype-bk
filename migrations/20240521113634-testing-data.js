module.exports = {
  async up(db, client) {
    await db.createCollection("Review");
    await db.createCollection("Comment");
    await db.createCollection("Subscription");
    await db.createCollection("Category");

    await db.collection("Comment").insertMany([
      {
        blog_post_id: "67068690653",
        name: "Micki Mous",
        created_at: new Date("2024-05-20T10:00:00Z"),
        email: "hi123hi@gmail.com",
        text: "NFEVNFIOVN JFDN VFNJVND fnvjdn nvfdjv vjdfnvjfd nvfnsvdndjsvd vfnvfkd nsvjojdj vfvfid vfjfdvn vvdfkvn vf vvkfdkvkvndf vfkvjsklv vfdfndvok vdfdvj  vfjvjfdk vfvffjnvdnvfvkfd vfvfkvndfk v vfji vf",
      },
      {
        blog_post_id: "67068690654",
        name: "Donald Duck",
        created_at: new Date("2024-05-21T11:00:00Z"),
        email: "donald123@gmail.com",
        text: "KFKLFNSF KJFJDKLVND KLJD LKVN KLVNDV LVN KLVN KLDFV KJD KLSVN KLFN DKLVNKD LVNL",
      },
      {
        blog_post_id: "67068690655",
        name: "Goofy",
        created_at: new Date("2024-05-22T12:00:00Z"),
        email: "goofy123@gmail.com",
        text: "LKLKJFLKF LJFJD LKJLKF LKJF LKLJ LK LKFJ LKJL LKF LKFJ LKJ LKJLKF JLJF LKFJ",
      },
    ]);

	 await db.collection("Review").insertMany([
      {
        product_id: "12345678901",
        customer_id: "1001",
        created_at: new Date("2024-05-20T10:00:00Z"),
        mark: 5,
        text: "Great product!",
      },
      {
        product_id: "12345678902",
        customer_id: "1002",
        created_at: new Date("2024-05-21T11:00:00Z"),
        mark: 4,
        text: "Very good, but could be better.",
      },
      {
        product_id: "12345678903",
        customer_id: "1003",
        created_at: new Date("2024-05-22T12:00:00Z"),
        mark: 3,
        text: "Average product.",
      },
    ]);

	 await db.collection("Subscription").insertMany([
      {
        email: "subscriber1@example.com",
        category: "Health",
        created_at: new Date("2024-05-20T10:00:00Z"),
      },
      {
        email: "subscriber2@example.com",
        category: "Fitness",
        created_at: new Date("2024-05-21T11:00:00Z"),
      },
      {
        email: "subscriber3@example.com",
        category: "Nutrition",
        created_at: new Date("2024-05-22T12:00:00Z"),
      },
    ]);

    await db.collection("Category").insertMany([
      {
        name: "Electronics",
        subcategories: [
          { name: "Phones", productCount: 100 },
          { name: "Laptops", productCount: 50 },
          { name: "Tablets", productCount: 30 },
        ],
      },
      {
        name: "Home Appliances",
        subcategories: [
          { name: "Refrigerators", productCount: 20 },
          { name: "Microwaves", productCount: 40 },
          { name: "Washing Machines", productCount: 15 },
        ],
      },
      {
        name: "Furniture",
        subcategories: [
          { name: "Beds", productCount: 25 },
          { name: "Sofas", productCount: 10 },
          { name: "Chairs", productCount: 35 },
        ],
      },
    ]);
  },

  async down(db, client) {
    await db.collection("Review").drop();
    await db.collection("Comment").drop();
    await db.collection("Subscription").drop();
    await db.collection("Category").drop();
  },
};
