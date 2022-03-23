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


//CSV
// id,product_id,body,date_written,asker_name,asker_email,reported,helpful

// SCHEMA
// id VARCHAR(36) NOT NULL,
//PRIMARY KEY (id),
//question_id INT NOT NULL,
//product_id INT NOT NULL,
//date DATETIME,
//asker_name VARCHAR(30),
//question_helpfulness INT,
//reported BOOLEAN

//POST QUESTION API
// body	text	Text of question being asked
// name	text	Username for question asker
// email	text	Email address for question asker
// product_id	integer	Required ID of the Product for which the question is posted