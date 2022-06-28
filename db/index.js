const mysql = require('mysql2');

  const pool = mysql.createPool({
    host: '172.31.84.75',
    user: 'caiwin',
    password: 'SDCpassword0@!',
    database: 'questions_answers',
    waitForConnections: true,
    connectionLimit: 150,
    queueLimit: 0,
    connectTimeout: 5000,
  });


pool.on('error', (err) => {
    console.log('Error connecting to db', err);
});

module.exports = pool;
