const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/create', auth, multer, postCtrl.create);
router.get('/all', auth, postCtrl.getAll);

module.exports = router;