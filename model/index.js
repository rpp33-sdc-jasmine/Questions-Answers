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
  postQuestion: (question, callback) => {
    // question ID needs to autoincremented from the last question
    const questionFields = 'id, question_id, product_id, body, date_written, asker_name, email';
    db.query(`INSERT INTO questions (${questionFields}) VALUES (uuid(), ${question.question_id}, ${question.product_id}, "${question.body}", NOW(), "${question.asker_name}", "${question.email}")`, (err, data) => {
        if (err) {
            console.log('Error inserting question into db', err);
            callback(err);
          } else {
              console.log('Success inserting data into db', data);
              callback(null, data)
          }
    })

  },
  getAnswers: (id) => {

  }
};
