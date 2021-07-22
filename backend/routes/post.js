const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/create', auth, multer, postCtrl.create);
router.put('/update/:postID', auth, multer, postCtrl.update);
router.get('/all', auth, postCtrl.getAll);

module.exports = router;