const sql = require('./db.js');

const User = function(user) {
    this.lastname = user.lastname;
    this.firstname = user.firstname;
    this.email = user.email;
    this.password = user.password;
    this.avatar_url = user.avatarUrl;
    this.job = user.job;
}

User.create = (newUser, result) => {
    sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err) {
            console.error(err)
            result(err, null);
            return;
        }

        console.log('Utilisateur créé : ', { id: res.insertId, ...newUser });
        result(null, {
            id: res.insertId,
            lastname: newUser.lastname,
            firstname: newUser.firstname,
            email: newUser.email,
            job: newUser.job,
        })
    })
}

User.getAll = (result) => {
    sql.query(
        `SELECT email, firstname, lastname, job, avatar_url
        FROM users`,
        (err, res) => {
            if (err) {
                console.error(err);
                result(null, err);
                return;
            }

            result(null, res);
        }
    )
}

User.findById = (userId, result) => {
    sql.query(
        `SELECT firstname, lastname, email, job, avatar_url, role
        FROM users
        WHERE id = ${userId}`,
        (err, res) => {
            if (err) {
                console.error(err);
                result(err, null);
                return;
            }

            if (res.length) {
                result(null, res[0]);
                return;
            }

            result({ code: 'not-found' }, null);
        }
    )
}

User.findByEmail = (userEmail, result) => {
    sql.query(
        `SELECT * FROM users WHERE email = ?`, userEmail,
        (err, res) => {
            if (err) {
                console.error(err);
                result(err, null);
                return;
            }

            if (res.length) {
                result(null, res[0]);
                return;
            }

            result({ code: 'not-found' }, null);
        }
    )
}

module.exports = User;