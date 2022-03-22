const mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'questions_answers'
});

dbConnection.connect(function(err) {
  if (err) {
    console.log('Database Connection Error!');
  } else {
    console.log('Database Connection Success!');
  }
});

module.exports.dbConnection = dbConnection;