const express = require('express');
const { getPosts } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getPosts);

module.exports = router;
