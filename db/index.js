const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  // host: 'localhost',
  host: 'ec2-3-80-177-122.compute-1.amazonaws.com'
  user: 'root', //change to a new user that is associated with my server ip and has been granted appropriate privilages?
  password: '',
  database: 'questions_answers'
});

module.exports.dbConnection = dbConnection;
