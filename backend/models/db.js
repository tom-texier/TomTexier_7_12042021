const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
})

db.connect(err => {
    if (err) {
        console.error('Impossible de se connecter la base de données : ');
        console.error(err.stack);
        return
    }
    console.log("Connexion établie !");
    db.query("CREATE DATABASE p7_reseau_social", function(err, result) {
        if (err) {
            console.error(err.sqlMessage);
        } else {
            console.log("Base de données créée !");
        }
    });
})

module.exports = db;