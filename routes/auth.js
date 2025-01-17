const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).send('Utilisateur enregistré avec succès');
  } catch (err) {
    res.status(400).send('Erreur lors de l\'enregistrement de l\'utilisateur');
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send('Utilisateur non trouvé');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Mot de passe incorrect');
    }

    const token = jwt.sign({ id: user.id }, 'votre_secret_jwt', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
