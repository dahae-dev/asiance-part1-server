const express = require("express");
const router = express.Router();

const postController = require("../controllers/posts");

router.get("/count", postController.getCount);
router.get("/posts", postController.getAllPosts);
router.get("/posts/:page", postController.getPostsPerPage);

module.exports = router;
