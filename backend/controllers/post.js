const Post = require('../models/post');

function nl2br(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

exports.create = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: 'Le contenu ne peut être vide !' });
    }

    const post = new Post({
        idUser: req.userID,
        description: nl2br(req.body.description),
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.image
    });

    Post.create(post, (err, post) => {
        if (err) {
            return res.status(500).json({ message: err.message || 'Some error occurred while creating the post.' })
        }
        return res.status(201).json({ post });
    })
}

exports.update = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: 'Le contenu ne peut être vide !' });
    }

    console.log(req.body);

    const post = {
        description: nl2br(req.body.description),
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.image
    };

    Post.update(
        req.params.postID,
        req.userID, {...post },
        (err, post) => {
            if (err) {
                return res.status(500).json({ message: err.message || 'Some error occurred while updating the post.' })
            }
            return res.status(200).json({ post });
        })
}

exports.getAll = (req, res, next) => {
    Post.getAll((err, posts) => {
        if (err) {
            return res.status(500).json({ message: err.message || 'Some error occurred while creating the post.' })
        }
        return res.status(200).json({ posts });
    });
}