const mysql = require("mysql");

const dbConfig = {
  host: '217.21.84.103',
  user: 'u199752113_root',
  password: 'Akshat@5346',
  database: 'u199752113_task',
};

const pool = mysql.createPool(dbConfig);

pool.on('connection', (connection) => {
  console.log('DB connected');
});

pool.on('error', (err) => {
  console.log('DB error:', err);
  // Handle database errors here, but do not throw them.
  // You can decide whether to reconnect or take other actions based on the error.
});

module.exports = pool;
