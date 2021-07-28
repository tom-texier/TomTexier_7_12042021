const sql = require('./db');

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
        `SELECT ID, firstname, lastname, email, job, avatar_url, role
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
            return;
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

User.update = (userID, updateUser, result) => {
    sql.query(`UPDATE users SET ? WHERE ID = ${userID}`, updateUser, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('Utilisateur mis à jour', {
            ...updateUser
        });
        result(null, {
            id: userID,
            ...updateUser
        })
    })
}

User.delete = (userID, result) => {
    sql.query(`DELETE FROM users WHERE ID = ${userID}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('Cet utilisateur a bien été supprimé !');
        result(null, true);
    });
}

module.exports = User;