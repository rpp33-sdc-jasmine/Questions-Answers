const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  // host: '172.31.24.98',
  host: ' 3.80.177.122',
  user: 'sdc',
  password: 'SDCpassword!0@',
  database: 'questions_answers'
});

module.exports.dbConnection = dbConnection;
