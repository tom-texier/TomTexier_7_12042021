const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/auth');

const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete/:userID', auth, userCtrl.delete);

module.exports = router;