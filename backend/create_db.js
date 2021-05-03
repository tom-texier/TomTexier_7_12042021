const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connexion établie !");
    con.query("CREATE DATABASE p7_reseau_social", function (err, result) {
        if (err){
            console.error(err.sqlMessage);
        }
        else {
            console.log("Base de données créée !");
        }
    });
});