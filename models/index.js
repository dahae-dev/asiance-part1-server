const Sequelize = require("sequelize");
const config = require("../util/secret");

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

db.Author = require("./author")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);

db.Author.hasMany(db.Post, { foreignKey: "authorId", sourceKey: "id" });
db.Post.belongsTo(db.Author, { foreignKey: "authorId", targetKey: "id" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
