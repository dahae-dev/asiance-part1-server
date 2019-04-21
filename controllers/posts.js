const db = require("../models");

module.exports = {
  getPosts: async (req, res, next) => {
    try {
      const results = await db.Post.findAll({
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
      console.log("results: ", results[0].dataValues);

      const posts = results.map(result => ({
        title: result.dataValues.title,
        body: result.dataValues.body,
        tags: result.dataValues.tags,
        image_url: result.dataValues.image_url,
        created_at: result.dataValues.created_at,
        updated_at: result.dataValues.updated_at,
        name: result.Author.dataValues.name,
        role: result.Author.dataValues.role,
        avatar: result.Author.dataValues.avatar,
        location: result.Author.dataValues.location
      }));

      res.json(posts);
    } catch (err) {
      console.log(err);
    }
  }
};
