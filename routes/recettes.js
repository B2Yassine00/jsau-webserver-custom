const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

// Chemins des fichiers JSON
const RECETTES_FILE = path.join(__dirname, '../data/recettes.json');
const FAVORITES_FILE = path.join(__dirname, '../data/favorites.json');

// Fonction générique pour lire un fichier JSON
const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Fonction générique pour écrire dans un fichier JSON
const writeJsonFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Route pour afficher toutes les recettes
router.get('/recettes', async (req, res) => {
  const search = req.query.search || '';
  const recettes = await readJsonFile(RECETTES_FILE);
  const filteredRecettes = recettes.filter((recette) =>
    recette.name.toLowerCase().includes(search.toLowerCase())
  );
  res.render('recettes', { recettes: filteredRecettes });
});

// Route pour afficher une recette spécifique
router.get('/recette/:id', async (req, res) => {
  const recettes = await readJsonFile(RECETTES_FILE);
  const recette = recettes.find((r) => r.id === req.params.id);
  recette
    ? res.render('recette', { recette })
    : res.status(404).send('Recette non trouvée');
});

// Route pour télécharger une recette
router.get('/recette/download/:name', async (req, res) => {
  const recettes = await readJsonFile(RECETTES_FILE);
  const recette = recettes.find((r) => r.name === req.params.name);
  recette
    ? res.download(path.join(__dirname, '../data/', `${recette.name}.html`))
    : res.status(404).send('Fichier non trouvé');
});

// Route pour ajouter une recette aux favoris
router.post('/favorites/add', async (req, res) => {
  const { filename } = req.body;
  const favorites = await readJsonFile(FAVORITES_FILE);
  if (!favorites.find((fav) => fav.filename === filename)) {
    favorites.push({ filename });
    await writeJsonFile(FAVORITES_FILE, favorites);
  }
  res.redirect("/recettes");
});

// Route pour supprimer une recette des favoris
router.post('/favorites/delete', async (req, res) => {
  const { filename } = req.body;
  let favorites = await readJsonFile(FAVORITES_FILE);
  favorites = favorites.filter((fav) => fav.filename !== filename);
  await writeJsonFile(FAVORITES_FILE, favorites);
  res.redirect("/favorites");
});

// Route pour afficher les favoris
router.get('/favorites', async (req, res) => {
  const favorites = await readJsonFile(FAVORITES_FILE);
  res.render('favorites', { favorites });
});

module.exports = router;
