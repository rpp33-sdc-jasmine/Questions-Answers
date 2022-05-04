const mysql = require('mysql2');

try{
  const dbConnection = mysql.createPool({
    host: '172.31.24.98',
    user: 'sdc',
    password: 'SDCpassword!0@',
    database: 'questions_answers',
    waitForConnections: true,
    connectionLimit: 150,
    queueLimit: 0
    // user: 'root',
    // password: '',
    // database: 'questions_answers'
  });
  console.log('Connected');
}
catch(err){
  console.log(err);
}

module.exports.dbConnection = dbConnection;
