const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'questions_answers'
});

module.exports.dbConnection = dbConnection;
