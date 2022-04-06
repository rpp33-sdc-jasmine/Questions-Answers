const db = require('../db').dbConnection;

module.exports= {
  getQuestions: (id) => {
    db.connect();
    let questionQuery = `SELECT question_id, question_body, question_date, asker_name, reported, question_helpfulness FROM questions WHERE questions.product_id=${id}`
    questionQuery = `SELECT JSON_OBJECT('id', a.id, 'body', a.body, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness) AS data FROM answers a WHERE a.question_id=${id};`;

    return new Promise((resolve, reject) => {
      db.query(questionQuery, (err, rows) => {
        if (err) {
          reject(Error)
          console.log('Error retrieving questions from database', err);
        } else {
          resolve({product_id: id, results: rows})
        }
      })
    })
    db.end();
  },
  getAnswers: (questions) => {
    // db.connect();
    // const answerQuery = `SELECT answers.id, answers.body, answers.date, answers.answerer_name, answers.helpfulness FROM answers WHERE`;
    // return new Promise((resolve, reject) => {
    //   resolve(questions.map((question) =>{
    //     const answerQuery = `SELECT id, body, date, answerer_name, reported, helpfulness FROM answers WHERE question_id=${question.question_id};`;
    //     db.query(answerQuery, (err, rows) => {
    //       if (err) {
    //         console.log('Error retrieving questions from the db', err);
    //       } else {
    //         return question.answers = rows;
    //       }
    //     });
    //   }));
    // })
    // db.end();
  },
  postQuestion: (question, callback) => {
    //TODO: question ID needs to autoincremented from the last question somehow
    // const questionFields = 'id, question_id, product_id, body, date_written, asker_name, email';
    // db.query(`INSERT INTO questions (${questionFields}) VALUES (uuid(), ${question.question_id}, ${question.product_id}, "${question.body}", UNIX_TIMESTAMP(), "${question.asker_name}", "${question.email}")`, (err, data) => {
    //   if (err) {
    //       console.log('Error inserting question into db', err);
    //       callback(err);
    //   } else {
    //       console.log('Success inserting data into db', data);
    //       callback(null, data)
    //   }
    // })
  },
  postAnswer: (id) => {

  },
  putHelpful: (id, table) => {
    db.connect();
    let helpfulness;
    table === 'questions' ? helpfulness = 'question_helpfulness' : helpfulness = 'helpfulness';
    let queryString = `UPDATE ${table} SET ${helpfulness} = ${helpfulness} + 1 WHERE question_id=${id};`

    return new Promise((resolve, reject) => {
      db.query(queryString, (err, data) => {
        if (err) {
          //throw new error
          console.log('error', err);
          reject('Error Updating Question Helpfulness', err);
        } else {
          resolve(data);
        }
      })
    })
  },
  putReported: (id) => {
  }
};

// ************************Pre Optimization**************************

//Original Queries
//Questions Only
//SELECT question_id, question_body, question_date, asker_name, reported, question_helpfulness FROM questions WHERE questions.product_id=1;

//Answers Only

//Photos Only

//Questions and Answers
//SELECT questions.question_id, questions.question_body, questions.question_date, questions.asker_name, questions.reported, questions.question_helpfulness, answers.id, answers.body, answers.date, answers.answerer_name, answers.helpfulness FROM questions INNER JOIN answers ON answers.question_id = questions.question_id AND questions.product_id=1;

//Questions Answers and Photos

// ************************Post Optimization**************************

//Optimized Queries using JSON Options
// select json_object('id',p.id,'desc',p.`desc`,'child_objects',(select CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id',id,'parent_id',parent_id,'desc',`desc`)),']')AS JSON) from child_table where parent_id = p.id)) from parent_table p;

// SELECT JSON_OBJECTAGG(question_id, asker_name) FROM questions WHERE product_id=1;


//Select Answers
// SELECT JSON_OBJECT('id', a.id, 'body', a.body, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness) FROM answers a WHERE a.question_id=1;

//Select Photos
// SELECT JSON_ARRAYAGG(p.url) from PHOTOS p WHERE p.answer_id=5;


// SELECT JSON_ARRAY((a.id, a.body, a.date) FROM answers a WHERE a.question_id=1;