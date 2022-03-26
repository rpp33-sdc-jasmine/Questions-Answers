const db = require('../db').dbConnection;

module.exports= {
  getQuestions: (id, callback) => {
    // //TODO: SELECT everything BUT product_id from questions table WHERE product_id=id AND join to answers table where question_id= current question_id
    // //TODO: Format unix timestamp

    // db.query(`SELECT * FROM questions WHERE product_id=${id}`, (err, rows, cols) => {
    //   if (err) {
    //     console.log('Error retrieving questions from the db', err);
    //   } else {
    //     callback(rows);
    //   }
    // })
  },
  postQuestion: (question, callback) => {
  //   //TODO: question ID needs to autoincremented from the last question somehow
  //   const questionFields = 'id, question_id, product_id, body, date_written, asker_name, email';
  //   db.query(`INSERT INTO questions (${questionFields}) VALUES (uuid(), ${question.question_id}, ${question.product_id}, "${question.body}", UNIX_TIMESTAMP(), "${question.asker_name}", "${question.email}")`, (err, data) => {
  //     if (err) {
  //         console.log('Error inserting question into db', err);
  //         callback(err);
  //     } else {
  //         console.log('Success inserting data into db', data);
  //         callback(null, data)
  //     }
  // })
  },
  getAnswers: (id) => {

  },
  postAnswer: (id) => {

  },
  putHelpful: (id) => {

  },
  putReported: (id) => {

  }

};
