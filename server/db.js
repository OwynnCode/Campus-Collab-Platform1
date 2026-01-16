const mysql = require("mysql2/promise");

// Create a pool of connections to reuse
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Blackcoder10!", // <-- replace this
  database: "campus_collab",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
