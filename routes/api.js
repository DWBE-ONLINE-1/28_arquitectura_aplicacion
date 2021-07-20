const router = require("express").Router();
const apiUsersRouter = require("./api/users");
const apiPostsRouter = require("./api/posts");
const apiCommentsRouter = require("./api/comments");

// http://localhos:4000/v1/users
router.use("/users", apiUsersRouter);

// http://localhos:4000/v1/posts
router.use("/posts", apiPostsRouter);

// http://localhos:4000/v1/comments
router.use("/comments", apiCommentsRouter);

module.exports = router;