const { Sequelize, sequelize } = require('./index');
const User = require('./User');

const Playlist = sequelize.define('Playlist', {
  title: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false }
});

Playlist.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Playlist;