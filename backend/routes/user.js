const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/me', auth, userCtrl.me);
router.get('/:userID', auth, userCtrl.getOne);
router.put('/update/:userID', auth, multer, userCtrl.update);

module.exports = router;