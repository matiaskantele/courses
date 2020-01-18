const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodeshop",
  password: "helloworld",
});

module.exports = pool.promise();
