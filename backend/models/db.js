const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

const db = mysql.createConnection(dbConfig);

db.connect(err => {
    if (err) {
        console.error('Impossible de se connecter la base de données : ');
        console.error(err.stack);
        return
    }
    console.log("Connexion à la base de données établie !");
})

module.exports = db;