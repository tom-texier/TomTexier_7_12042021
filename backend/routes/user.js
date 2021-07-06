const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/me', auth, userCtrl.me);

module.exports = router;