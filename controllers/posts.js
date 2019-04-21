const db = require("../models");

module.exports = {
  getPosts: async (req, res, next) => {
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
  }
};
