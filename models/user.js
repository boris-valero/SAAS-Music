const { Sequelize, sequelize } = require('./index');

const User = sequelize.define('User', {
  username: { type: Sequelize.STRING, allowNull: false, unique: true },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false }
});

module.exports = User;