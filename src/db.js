const Sequelize = require('sequelize');

const sequelize = new Sequelize('b9frz1aqbtopvwjm', 'lrkvjsf30s4xyymx', 'o7ke4ldhg9u55n1p', {
  host: 'l6glqt8gsx37y4hs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  dialect: 'mysql'
});

module.exports = sequelize;