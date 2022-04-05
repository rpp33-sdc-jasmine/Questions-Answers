const db = require('../db').dbConnection;

module.exports= {
  getQuestions: (id) => {
    db.connect();
    const questionQuery = `SELECT question_id, question_body, question_date, asker_name, reported, question_helpfulness FROM questions WHERE questions.product_id=${id}`

    return new Promise((resolve, reject) => {
      db.query(questionQuery, (err, rows) => {
        if (err) {
          console.log('Error retrieving questions from database', err);
        } else {
          resolve({product_id: id, results: rows})
        }
      })
    })
  },
  getAnswers: (questions) => {
    // db.connect();
    const answerQuery = `SELECT answers.id, answers.body, answers.date, answers.answerer_name, answers.helpfulness FROM answers WHERE`;
    return new Promise((resolve, reject) => {
      resolve(questions.map((question) =>{
        const answerQuery = `SELECT id, body, date, answerer_name, reported, helpfulness FROM answers WHERE question_id=${question.question_id};`;
        db.query(answerQuery, (err, rows) => {
          if (err) {
            console.log('Error retrieving questions from the db', err);
          } else {
            return question.answers = rows;
          }
        });
      }));
    })
    // db.end();
  },
  getPhotos: () => {
    //TODO
  },
  postQuestion: (question, callback) => {
    //TODO: question ID needs to autoincremented from the last question somehow
    const questionFields = 'id, question_id, product_id, body, date_written, asker_name, email';
    db.query(`INSERT INTO questions (${questionFields}) VALUES (uuid(), ${question.question_id}, ${question.product_id}, "${question.body}", UNIX_TIMESTAMP(), "${question.asker_name}", "${question.email}")`, (err, data) => {
      if (err) {
          console.log('Error inserting question into db', err);
          callback(err);
      } else {
          console.log('Success inserting data into db', data);
          callback(null, data)
      }
    })
  },
  postAnswer: (id) => {

  },
  putHelpful: (id) => {

  },
  putReported: (id) => {

  }

};

