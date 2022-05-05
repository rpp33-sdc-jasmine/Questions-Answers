// const db = require('../db').dbConnection;
const utils = require('../utils.js');

//Todo: Connection Pooling
const mysql = require('mysql2');

  const db = mysql.createPool({
    // user: 'root',
    // password: '',
    host: '172.31.84.75',
    user: 'caiwin',
    password: 'SDCpassword0@!',
    database: 'questions_answers',
    waitForConnections: true,
    connectionLimit: 150,
    queueLimit: 0,
  });
  db.on('connection', (connection) => {
    console.log('Connected to MySql db');
});

db.on('error', (err) => {
    console.log('Error connecting to db', err);
});

const getQuestions = (id) => {
  //TODO Need to return questions that do not have answers, AND need to handle only returning answers that have not been reported
    const questionQuery = `SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) FROM photos p WHERE p.answer_id=a.id GROUP BY a.id))) AS answers FROM answers a LEFT JOIN questions q ON a.question_id=q.question_id WHERE q.product_id=${id} GROUP BY q.question_id;`
    return new Promise((resolve, reject) => {
      db.query(questionQuery, (err, data) => {
        if (err) {
          return reject(err)
        } else {
          resolve(data)
        }
      })
    })
  };

  const getAnswers = (data) => {
    //TODO Answers should return null for photos if there are no photos, not array with null inside it
    const answerQuery = `SELECT a.id, a.body, a.date, a.answerer_name, a.helpfulness, JSON_ARRAYAGG(p.url) AS photos FROM answers a LEFT JOIN photos p ON a.id=p.answer_id WHERE question_id=${data.question_id} && a.reported < 1 GROUP BY a.id;`;
    return new Promise((resolve, reject) => {
      db.query(answerQuery, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      })
    })
  };

  const postQuestion = (question) => {
    const questionFields = 'product_id, question_body, question_date, asker_name, email, question_helpfulness, reported';
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO questions (${questionFields}) VALUES (${question.product_id}, "${question.body}", UNIX_TIMESTAMP(), "${question.name}", "${question.email}", 0, 0);`, (err, data) => {
        if (err) {
            return reject(err);
        } else {
          resolve('Success Posting Question');
        }
      })
    })
  };

  const postAnswer = (data) => {
    // TODO: If photo insert is not successful, rollback answer insert
    return new Promise((resolve, reject) => {
      let answerQueryString = `INSERT INTO answers (question_id, body, date, answerer_name, email, helpfulness, reported) VALUES(${data.question_id}, '${data.body}', UNIX_TIMESTAMP(), '${data.name}', '${data.email}', 0, 0);`;
      db.query(answerQueryString, (err, answerData) => {
        if (err) {
          return reject(err);
        }
        let answer_id=answerData.insertId;
        let promises = data.photos.map((photo) => {
          return new Promise((resolve, reject) => {
            let photoQueryString = `INSERT INTO photos (answer_id, url) VALUES(${answer_id}, '${photo}');`;
            db.query(photoQueryString, (err, photoData) => {
              if(err) {
                return reject(err);
              }
              resolve(photoData);
            })
          })
        })
        resolve('Success Posting Answer');
      })
    })
  };

  const putHelpful = (id, table) => {
    let helpfulness, tablename;
    if (table === 'questions') {
      helpfulness = 'question_helpfulness';
      tablename = 'question_id';
    } else {
      helpfulness = 'helpfulness';
      tablename = 'id';
    }
    let queryString = `UPDATE ${table} SET ${helpfulness} = ${helpfulness} + 1 WHERE ${tablename}=${id};`

    return new Promise((resolve, reject) => {
      db.query(queryString, (err, data) => {
        if (err) {
          return reject(err);
        } else {
          resolve('Success Updating Helpfulness');
        }
      })
    })
  };

  const putQuestionReported = (id) => {
    let queryString = `UPDATE questions SET reported = reported + 1 WHERE question_id=${id};`

    return new Promise((resolve, reject) => {
      db.query(queryString, (err, data) => {
        if (err) {
          return reject(err);
        } else {
          resolve('Success Reporting Question');
        }
      })
    })
  };

  const putAnswerReported = (id) => {
    let queryString = `UPDATE answers SET reported = reported + 1 WHERE id=${id};`

    return new Promise((resolve, reject) => {
      db.query(queryString, (err, data) => {
        if (err) {
          return reject(err);
        } else {
          resolve('Success Reporting Answer');
        }
      })
    })
  };

  module.exports = {
    getQuestions,
     getAnswers,
     postQuestion,
     postAnswer,
     putHelpful,
     putQuestionReported,
     putAnswerReported
  };



  //IF there are no answers the quetion is not being returned right now
  //needs to include 202
  //1. SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) FROM photos p WHERE p.answer_id=a.id GROUP BY a.id))) AS answers FROM answers a LEFT JOIN questions q ON a.question_id=q.question_id WHERE q.product_id=63 GROUP BY q.question_id;


  //JSON documents may not contain NULL member names
  //2. SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) FROM photos p WHERE p.answer_id=a.id GROUP BY a.id))) AS answers FROM questions q LEFT JOIN answers a ON a.question_id=q.question_id WHERE q.product_id=63 GROUP BY q.question_id;


//I basically want to say collect all questions this way -- but I am getting null values. Which the JSON object doesn't like. Basically if there is a NULL value for id, I want to just return an empty string?
  // SELECT q.question_id, q.question_body, a.id, a.body FROM questions q LEFT JOIN answers a ON a.question_id = q.question_id WHERE q.product_id=63;


  //Trying to check if the value is null, syntax error
  // 3. SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(IF(a.id IS NULL, ''), a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) FROM photos p WHERE p.answer_id=a.id GROUP BY a.id))) AS answers FROM questions q LEFT JOIN answers a ON a.question_id=q.question_id WHERE q.product_id=63 GROUP BY q.question_id;




  //The issue: When a question does not have answers. The value would be null. We can't have null as a key.
  //What I need to do: If I get a null value for a.id I just want to return an empty object AS answers
  // SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) FROM photos p WHERE p.answer_id=a.id GROUP BY a.id))) AS answers FROM questions q LEFT JOIN answers a ON a.question_id=q.question_id WHERE q.product_id=63 GROUP BY q.question_id;



  //Things to look into
  // JSON_OBJECTAGG(IFNULL(key, ''), value)

  //Confused about this one
  //JSON_REMOVE(JSON_OBJECTAGG(IFNULL(column_holding_property_name, 'null__'), column_holding_property_value), '$.null__')

  // ABSENT ON NULL clause
  // https://oracle-base.com/articles/12c/sql-json-functions-12cr2

  // SELECT q.question_id, q.question_body, a.id, a.body FROM questions q LEFT JOIN answers a ON a.question_id = q.question_id WHERE q.product_id=63;

  // SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) FROM photos p WHERE p.answer_id=a.id GROUP BY a.id))) AS answers FROM answers a LEFT JOIN questions q ON a.question_id=q.question_id WHERE q.product_id=4963 GROUP BY q.question_id;

