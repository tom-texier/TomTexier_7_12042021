// Importer les packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Headers pour contourner les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Rendre la requête exploitable
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir le dossier image de façon statique
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

module.exports = app;