const db = require('../db').dbConnection;
// CREATE TABLE answers (
//   id INT NOT NULL,
//   question_id INT NOT NULL,
//   body VARCHAR(1000),
//   date INT(11),
//   answerer_name VARCHAR(30),
//   helpfulness INT,
//   reported BOOLEAN
module.exports= {
  getQuestions: (id) => {
    db.connect();
    // const questionQuery = `SELECT question_id, question_body, question_date, asker_name, reported, question_helpfulness FROM questions WHERE product_id=${id};`;
    const questionQuery = `SELECT questions.question_id, questions.question_body, questions.question_date, questions.asker_name, questions.reported, questions.question_helpfulness, answers.id, answers.body, answers.date, answers.answerer_name, answers.helpfulness
    FROM questions INNER JOIN answers
    ON answers.question_id = questions.question_id
    AND questions.product_id=${id};`;
    const options = { sql: questionQuery, nestTables: true };
    return new Promise((resolve, reject) => {
      db.query(options, (err, rows) => {
        if (err) {
          console.log('Error retrieving questions from the db', err);
        } else {
          resolve({product_id: id, results: rows});
        }
      })
    })
    db.end();
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
  getAnswers: (id) => {
    // db.connect();
    const answerQuery = `SELECT id, body, date, answerer_name, reported, helpfulness FROM answers WHERE question_id=${id};`;
    return new Promise((resolve, reject) => {
      db.query(answerQuery, (err, answers) => {
        if (err) {
          console.log('Error retrieving questions from the db', err);
        } else {
          let currentId = answers.id
          resolve(...answers);
        }
      })
    })
    // db.end();
  },
  postAnswer: (id) => {

  },
  putHelpful: (id) => {

  },
  putReported: (id) => {

  }

};

