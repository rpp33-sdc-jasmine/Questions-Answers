var db = require('../db').dbConnection;

module.exports= {
  getQuestions: (callback) => {
    db.query('SELECT * FROM questions', (err, rows, cols) => {
      if (err) {
        console.log('Error retrieving questions from the db', err);
      } else {
        callback(rows);
      }
    })

  },
  postQuestion: () => {

  },
  getAnswers: () => {

  },
  postQuestion: () => {
  }
};