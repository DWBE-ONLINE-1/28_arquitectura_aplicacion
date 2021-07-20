const Sequelize = require('sequelize');
const ENV = require("./env");
const sequelize = new Sequelize(ENV.DB, ENV.USER, ENV.PASSWORD, {
  host: ENV.HOST,
  dialect: ENV.CONNECTOR
  // define: {
  //   freezeTableName: true    //prevent sequelize from pluralizing table names
  // }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../../models/users.js')(sequelize, Sequelize);
db.comments = require('../../models/comments.js')(sequelize, Sequelize);
db.posts = require('../../models/posts.js')(sequelize, Sequelize);

//Relations
db.comments.belongsTo(db.posts);
db.posts.hasMany(db.comments);
db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);

sequelize.sync({ force: false }).then(() => {
  console.info("Tablas sincronizadas");
}).catch(console.error);


module.exports = db;