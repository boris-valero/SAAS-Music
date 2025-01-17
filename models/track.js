const { Sequelize, sequelize } = require('./index');
const Playlist = require('./Playlist');

const Track = sequelize.define('Track', {
  title: { type: Sequelize.STRING, allowNull: false },
  artist: { type: Sequelize.STRING, allowNull: false },
  url: { type: Sequelize.STRING, allowNull: false }
});

Track.belongsTo(Playlist, { foreignKey: 'playlist_id' });

module.exports = Track;