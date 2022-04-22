const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  host: 'localhost',
  password: '',
  database: 'questions_answers'
});

module.exports.dbConnection = dbConnection;
