module.exports = {
  async up(db, client) {
    await db.collection("comment").insertMany([
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
  },

  async down(db, client) {
    await db.collection("review").deleteMany({});
    await db.collection("comment").deleteMany({});
    await db.collection("subscription").deleteMany({});
    await db.collection("category").deleteMany({});
  },
};
