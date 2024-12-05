const app = require('./app');
require('dotenv').config(); // Laisser dotenv si des variables d'environnement sont utilisées

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
