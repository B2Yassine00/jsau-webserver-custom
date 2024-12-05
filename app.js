const express = require('express');
const path = require('path');
const recettesRoutes = require('./routes/recettes.js');
require('dotenv').config(); // Laisser dotenv si des variables d'environnement sont utilisées

const app = express();

// Configurations
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', recettesRoutes);
module.exports = app;

