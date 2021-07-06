const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Content can not be empty' });
    }

    bcrypt.hash(req.body.password, 10)
        .then((hashPassword) => {
            const user = new User({
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: hashPassword,
                job: req.body.job,
            });

            User.create(user, (err, user) => {
                if (err) {
                    return res.status(500).json({ message: err.message || 'Some error occurred while creating the user.' })
                }
                return res.status(201).json({ user })
            })
        })
}

exports.login = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Content can not be empty' });
    }

    User.findByEmail(req.body.email, (err, user) => {
        if (err) {
            switch (err.code) {
                case 'not-found':
                    return res.status(404).json({ message: `Ce compte ne semble pas être enregistré.` });
                default:
                    return res.status(500).json({ message: `Une erreur est survenue. Merci de réessayer utltérieurement.` });
            }
        } else {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Il semble que l'email et/ou le mot de passe renseignés ne soit pas valides." });
                    }
                    return res.status(200).json({
                        userID: user.ID,
                        token: jwt.sign({ userID: user.ID }, process.env.JWT_SECRET_TOKEN, { expiresIn: '24h' })
                    });
                })
                .catch(error => {
                    return res.status(500).json({ error })
                });
        }
    })
}