const router = require("express").Router();
const { raw } = require("body-parser");
const db = require("../../server/config/db");
const { v4: uuidv4 } = require('uuid');

// http://localhost:4000/v1/users
router.get('/', async (req, res) => {
    let users = {};
    const { details = false, fullDetails = false, rawQuery = false } = req.query;

    if (details) {
        console.info("find all details");
        users = await db.users.findAll();
    }

    if (rawQuery) {
        console.info("find all raw query");
        users = await db.sequelize.query('SELECT * FROM users');
    }

    if (fullDetails) {
        console.info("find all full details");
        users = await db.users.findAll({
            include: [
                {
                    model: db.posts,
                    include: [
                        {
                            model: db.comments
                        }
                    ]
                }
            ]
        });
    }

    res.json(users);
});

// http://localhost:4000/v1/users/234234
router.get('/:userId', async (req, res) => {
    let user = {};
    const {
        details = false,
        fullDetails = false,
        rawQueryUnnamedParameter = false,
        rawQueryNamedParameter = false,
        rawQueryFullDetails = false
    } = req.query;

    if (details) {
        user = await db.users.findOne({
            where: {
                id: req.params.userId
            }
        });
    }

    if (rawQueryUnnamedParameter) {
        user = await db.sequelize.query('SELECT * FROM users WHERE id = ?', {
            replacements: [req.params.userId],
            type: db.sequelize.QueryTypes.SELECT
        });
    }

    if (rawQueryNamedParameter) {
        user = await db.sequelize.query('SELECT * FROM users WHERE id = :userId', {
            replacements: {
                userId: req.params.userId
            },
            type: db.sequelize.QueryTypes.SELECT
        });
    }

    if (rawQueryFullDetails) {
        user = await db.sequelize.query(`SELECT * FROM users u 
                                         LEFT JOIN posts p ON p.user_id = u.id 
                                         LEFT JOIN comments c ON c.post_id = p.id
                                         WHERE u.id = :userId  `, {
            replacements: {
                userId: req.params.userId
            },
            type: db.sequelize.QueryTypes.SELECT
        });
    }

    if (fullDetails) {
        user = await db.users.findOne({
            include: [
                {
                    model: db.posts,
                    include: [
                        {
                            model: db.comments
                        }
                    ]
                }
            ],
            where: {
                id: req.params.userId
            }
        });
    }

    res.json(user);
});

// http://localhost:4000/v1/users
router.post('/', async (req, res) => {
    let user = {};
    const { create = false, createRawQuery = false } = req.query;

    if (create) {
        user = await db.users.create(req.body);
    }

    if (createRawQuery) {
        const rawQuery = `
        INSERT 
        INTO users(id, username, role, created_at, updated_at)
        VALUES(?, ?, ?, ?, ?)`;
        user = await db.sequelize.query(rawQuery, {
            replacements: [
                uuidv4(),
                req.body.username,
                req.body.role,
                req.body.created_at,
                req.body.updated_at
            ],
            type: db.sequelize.QueryTypes.SELECT
        });

        console.log("falta");
    }

    res.json(user);
});

module.exports = router;
