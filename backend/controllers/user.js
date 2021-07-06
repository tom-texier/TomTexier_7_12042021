const bcrypt = require('bcrypt');

const User = require('../models/user.js');

exports.me = (req, res, next) => {
    User.findById(req.userID, (err, user) => {
        if (err) {
            switch (err.code) {
                case 'not-found':
                    return res.status(404).json({ message: `L'utilisateur avec cet identifiant est introuvable` });
                default:
                    return res.status(500).json({ message: `Une erreur est survenue. Merci de réessayer utltérieurement.` });
            }
        } else {
            return res.status(200).json(user);
        }
    })
}