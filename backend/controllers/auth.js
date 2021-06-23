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
                    res.status(404).json({ message: `Not found ${req.body.email}` });
                default:
                    res.status(500).json({ message: `Error retrieving User ${req.body.email}` });
            }
        } else {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect" });
                    }
                    res.status(200).json({
                        userID: user.ID,
                        token: jwt.sign({ userID: user.ID }, process.env.JWT_SECRET_TOKEN, { expiresIn: '24h' })
                    });
                })
                .catch(error => res.status(500).json({ error }));
        }
    })
}