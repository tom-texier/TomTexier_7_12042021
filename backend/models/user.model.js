const sql = require('./db.js');

const User = function(user) {
    this.name = user.name;
    this.firstname = user.firstname;
    this.email = user.email;
    this.password = user.password;
    this.avatar_url = user.avatar_url;
    this.job = user.job;
    this.role = user.role;
}

module.exports = User;