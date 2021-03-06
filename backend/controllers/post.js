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
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.image,
    });

    Post.create(post, (err, post) => {
        if (err) {
            return res.status(500).json({ message: err.message || 'Une erreur est survenue pendant la création de la publication' });
        }
        return res.status(201).json({ post });
    })
}

exports.update = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: 'Le contenu ne peut être vide !' });
    }

    const post = {
        description: nl2br(req.body.description),
        image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.image
    };

    Post.update(
        req.params.postID,
        req.userID, {...post },
        (err, post) => {
            if (err) {
                return res.status(500).json({ message: err.message || 'Une erreur est survenue pendant la mise à jour de la publication' });
            }
            return res.status(200).json({ post });
        })
}

exports.delete = (req, res, next) => {
    if (!req.params.postID) {
        res.status(400).json({ message: 'Une erreur est survenue. Nous n\'arrivons pas à récupérer cette publication' });
    }

    Post.delete(
        req.params.postID,
        (err, postID) => {
            if (err) {
                res.status(500).json({ message: err.message || 'Une erreur est survenue pendant la suppression de la publication' });
            }
            return res.status(200).json(postID);
        }
    )
}

exports.getAll = (req, res, next) => {
    Post.getAll((err, posts) => {
        if (err) {
            return res.status(500).json({ message: err.message || 'Une erreur est survenue pendant la récupération des publications' })
        }
        return res.status(200).json({ posts });
    });
}

exports.getMetas = (req, res, next) => {
    if (!req.body.userID || !req.body.postID) {
        res.status(400).json({ message: 'Une erreur est survenue.' });
    }

    let metas = {
        userLiked: 0,
    };

    Post.getUserLiked(
        req.body.userID,
        req.body.postID,
        (err, meta) => {
            if (err) {
                return res.status(500).json({ message: err.message || 'Une erreur est survenue' });
            }
            metas.userLiked = meta[0].USER_LIKED;
            return res.status(200).json({ metas });
        })
}

exports.like = (req, res, next) => {
    if (!req.params.postID) {
        res.status(400).json({ message: 'Une erreur est survenue.' });
    }
    Post.like(req.params.postID, req.userID, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message || 'Une erreur est survenue' });
        }
        return res.status(200).json({ message: "Post liked" })
    })
}

exports.dislike = (req, res, next) => {
    if (!req.params.postID) {
        res.status(400).json({ message: 'Une erreur est survenue.' });
    }
    Post.dislike(req.params.postID, req.userID, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message || 'Une erreur est survenue' });
        }
        return res.status(200).json({ message: "Post liked" })
    })
}

exports.getAllByUserId = (req, res, next) => {
    if (!req.params.userID) {
        res.status(400).json({ message: 'Une erreur est survenue.' });
    }

    Post.getAllByUserId(
        req.params.userID,
        (err, posts) => {
            if (err) {
                return res.status(500).json({ message: err.message || 'Une erreur est survenue pendant la récupération des publications' })
            }
            return res.status(200).json({ posts });
        });
}

exports.share = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: 'Le contenu ne peut être vide !' });
    }

    const post = {
        id_sharer: req.userID,
        id_user: req.body.authorID,
        description: nl2br(req.body.description),
        image: req.body.image,
        comment: req.body.comment ? nl2br(req.body.comment) : null,
        is_share: true,
        firstname_sharer: req.body.firstname_sharer,
        lastname_sharer: req.body.lastname_sharer,
        job_sharer: req.body.job_sharer,
        avatar_sharer: req.body.avatar_sharer
    };

    Post.create(post, (err, post) => {
        if (err) {
            return res.status(500).json({ message: err.message || 'Une erreur est survenue pendant la création de la publication' });
        }
        return res.status(201).json({ post });
    })
}

exports.updateShared = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: 'Le contenu ne peut être vide !' });
    }

    const post = {
        comment: nl2br(req.body.comment),
    };

    Post.update(
        req.params.postID,
        req.userID, {...post },
        (err, post) => {
            if (err) {
                return res.status(500).json({ message: err.message || 'Une erreur est survenue pendant la mise à jour de la publication' });
            }
            return res.status(200).json({ post });
        })
}