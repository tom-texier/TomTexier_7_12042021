const bcrypt = require('bcrypt');

const User = require('../models/user.js');

exports.me = (req, res, next) => {
    User.findById(
        req.userID,
        (err, user) => {
            if (err) {
                switch (err.code) {
                    case 'not-found':
                        return res.status(404).json({ message: `Impossible de trouver cet utilisateur !` });
                    default:
                        return res.status(500).json({ message: `Une erreur est survenue. Merci de réessayer utltérieurement.` });
                }
            } else {
                return res.status(200).json(user);
            }
        })
}

exports.update = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Le contenu ne peut être vide !' });
    }

    if (!req.params.userID) {
        return res.status(400).json({ message: 'Une erreur est survenue. Merci de réessayer utltérieurement.' });
    }

    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        job: req.body.job,
    };

    if (req.body.image || req.file) {
        user.avatar_url = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.image;
    }

    if (req.body.password) {
        bcrypt.hash(req.body.password, 10)
            .then((hashPassword) => {
                user.password = hashPassword;

                User.update(
                    req.params.userID,
                    user,
                    (err, user) => {
                        if (err) {
                            return res.status(500).json({
                                message: err.message || 'Une erreur est survenue pendant la mise à jour de l\'utilisateur'
                            });
                        }
                        return res.status(200).json({ user });
                    })

            })
    } else {
        User.update(
            req.params.userID,
            user,
            (err, user) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message || 'Une erreur est survenue pendant la mise à jour de l\'utilisateur'
                    });
                }
                return res.status(200).json({ user });
            })
    }
}

exports.getOne = (req, res, next) => {
    if (!req.params.userID) {
        return res.status(400).json({ message: 'Une erreur est survenue. Merci de réessayer utltérieurement.' });
    }

    User.findById(
        req.params.userID,
        (err, user) => {
            if (err) {
                switch (err.code) {
                    case 'not-found':
                        return res.status(404).json({ message: `Impossible de trouver cet utilisateur !` });
                    default:
                        return res.status(500).json({ message: `Une erreur est survenue. Merci de réessayer utltérieurement.` });
                }
            } else {
                return res.status(200).json(user);
            }
        })
}