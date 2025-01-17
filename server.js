const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlist');

app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);

// Synchroniser les modèles avec la base de données
sequelize.sync().then(() => {
  console.log('Base de données synchronisée');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});