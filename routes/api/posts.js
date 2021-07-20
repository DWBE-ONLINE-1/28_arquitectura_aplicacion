const router = require("express").Router();
const db = require("../../server/config/db");

// http://localhost:8082/posts
router.post('/', async (req, res) => {
    const created_at = new Date();
    const newPost = req.body.post;
    const post = await db.posts.create({
        user_id: newPost.user_id,
        content: newPost.content,
        created_at: created_at
    });
    res.json(post);
});

module.exports = router;