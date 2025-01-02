/*mysql -h us-cdbr-east-06.cleardb.net -u b231d6ccbd1fde -p*/
require("dotenv").config();

module.exports = {
  HOST: process.env.HOSTNAME,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
  DB: process.env.MYSQL_DATABASE,
};
