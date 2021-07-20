const router = require("express").Router();
const db = require("../../server/config/db");

// http://localhost:8082/comments
router.post('/', async (req, res) => {
    const created_at = new Date();
    const newComment = req.body.comment;
    const comment = await db.comments.create({
        post_id: newComment.post_id,
        content: newComment.content,
        commenter_username: newComment.commenter_username,
        commenter_email: newComment.commenter_email,
        created_at: created_at
    });
    res.json(comment);
});

module.exports = router;