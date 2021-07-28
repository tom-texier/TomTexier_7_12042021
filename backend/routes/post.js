const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/create', auth, multer, postCtrl.create);
router.put('/update/:postID', auth, multer, postCtrl.update);
router.get('/like/:postID', auth, postCtrl.like);
router.delete('/dislike/:postID', auth, postCtrl.dislike);
router.delete('/delete/:postID', auth, multer, postCtrl.delete);
router.get('/all', auth, postCtrl.getAll);
router.get('/all/:userID', auth, postCtrl.getAllByUserId);
router.post('/metas', auth, postCtrl.getMetas);

module.exports = router;