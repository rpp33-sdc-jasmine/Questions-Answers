const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'questions_answers'
});

module.exports.dbConnection = dbConnection;
