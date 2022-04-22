const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  host: '44.200.37.117', //needs to be,
  user: 'remote-server'
  password: 'USMhorse17!',
  database: 'questions_answers'
});

module.exports.dbConnection = dbConnection;
