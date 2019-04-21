const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const config = {
  username: process.env["DB_USER"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_DATABASE"],
  host: process.env["DB_HOST"],
  dialect: "mysql"
};

module.exports = config;
