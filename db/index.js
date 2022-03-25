const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'questions_answers'
});

const connect = () => {
  return new Promise((resolve) => {
    resolve(dbConnection.connect());
  })
};

const disconnect = () => {
  dbConnection.end();
}

module.exports.connect = connect;
module.exports.disconnect = disconnect;
