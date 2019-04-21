const db = require("../models");

module.exports = {
  getCount: async (req, res, next) => {
    try {
      const count = await db.Post.count();

      res.json({
        count
      });
    } catch (err) {
      console.log(err);
    }
  },
  getAllPosts: async (req, res, next) => {
    try {
      const posts = await db.Post.findAll({
        include: [
          {
            model: db.Author,
            required: true,
            attributes: {
              include: ["name", "role", "avatar", "location"],
              exclude: ["created_at", "updated_at"]
            }
          }
        ],
        order: [["id", "ASC"]]
      });
      // console.log("posts: ", posts[0].dataValues);

      res.json(posts);
    } catch (err) {
      console.log(err);
    }
  },
  getPostsPerPage: async (req, res, next) => {
    try {
      const page = req.params.page;
      const offset = page * 5 - 5;

      const posts = await db.Post.findAll({
        include: [
          {
            model: db.Author,
            required: true,
            attributes: {
              include: ["name", "role", "avatar", "location"],
              exclude: ["created_at", "updated_at"]
            }
          }
        ],
        order: [["id", "ASC"]],
        offset,
        limit: 5
      });

      res.json({
        posts
      });
    } catch (err) {
      console.log(err);
    }
  }
};
