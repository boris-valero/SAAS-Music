const express = require('express');
const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Créer une nouvelle playlist
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, tracks } = req.body;
  const userId = req.user.id;

  try {
    const newPlaylist = await Playlist.create({ title, description, user_id: userId });
    if (tracks && tracks.length > 0) {
      for (const track of tracks) {
        await Track.create({ ...track, playlist_id: newPlaylist.id });
      }
    }
    res.status(201).send('Playlist créée avec succès');
  } catch (err) {
    res.status(400).send('Erreur lors de la création de la playlist');
  }
});

// Obtenir toutes les playlists d'un utilisateur
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const playlists = await Playlist.findAll({ where: { user_id: userId }, include: Track });
    res.json(playlists);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
