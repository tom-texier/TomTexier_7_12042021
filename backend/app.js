// Importer les packages
const express = require('express');
const app = express();

const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

con.connect(function(err) {
    if (err) {
        console.error('Impossible de se connecter la base de données : ');
        console.error(err.stack);
        return
    }
    console.log("Connexion établie !");
    con.query("CREATE DATABASE p7_reseau_social", function(err, result) {
        if (err) {
            console.error(err.sqlMessage);
        } else {
            console.log("Base de données créée !");
        }
    });
});



// Headers pour contourner les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
});

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
});


// Rendre la requête exploitable
app.use(express.json());

module.exports = app;