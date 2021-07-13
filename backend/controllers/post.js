const Post = require('../models/post');

exports.create = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: 'Le contenu ne peut être vide !' });
    }

    const post = new Post({
        idUser: req.userID,
        description: req.body.description,
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.image
    });

    Post.create(post, (err, post) => {
        if (err) {
            return res.status(500).json({ message: err.message || 'Some error occurred while creating the post.' })
        }
        return res.status(201).json({ post });
    })
}

exports.getAll = (req, res, next) => {
    Post.getAll((err, posts) => {
        if (err) {
            return res.status(500).json({ message: err.message || 'Some error occurred while creating the post.' })
        }
        console.log(posts);
        return res.status(200).json({ posts });
    });
}