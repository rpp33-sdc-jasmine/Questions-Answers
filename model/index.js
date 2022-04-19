const db = require('../db').dbConnection;
const utils = require('../utils.js');

//TODO: Pooling connections
db.connect()

const getQuestions = (id) => {
    // const questionQuery = `SELECT question_id, question_body, question_date, asker_name, reported, question_helpfulness FROM questions WHERE product_id=${id}`;
    const questionQuery = `SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) FROM photos p LEFT JOIN answers a ON p.answer_id=a.id LEFT JOIN questions q on a.question_id=q.question_id WHERE q.product_id=${id}))) AS answers FROM answers a INNER JOIN questions q ON a.question_id=q.question_id WHERE q.product_id=${id};`
    return new Promise((resolve, reject) => {
      db.query(questionQuery, (err, data) => {
        if (err) {
          reject(Error)
          console.log(err);
        } else {
          resolve({product_id: id, results: data})
        }
      })
    })
  };

  const getAnswers = (data) => {
    // TODO If an answer is reported it should not be returned
    const answerQuery = `SELECT a.question_id, a.id, a.body, a.date, a.answerer_name, a.helpfulness, JSON_ARRAYAGG(p.url) AS photos FROM answers a LEFT JOIN photos p ON a.id=p.answer_id  WHERE question_id=${data.question_id} GROUP BY a.id;`;
    return new Promise((resolve, reject) => {
      db.query(answerQuery, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    })
  };

  const postQuestion = (question) => {
    // TODO: question ID needs to autoincremented from the last question in a more robust way
    const questionFields = 'product_id, question_body, question_date, asker_name, email, question_helpfulness, reported';
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO questions (${questionFields}) VALUES (${question.product_id}, "${question.body}", UNIX_TIMESTAMP(), "${question.name}", "${question.email}", 0, 0);`, (err, data) => {
        if (err) {
            reject(err);
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
          reject(err);
        }
        let answer_id=answerData.insertId;
        let promises = data.photos.map((photo) => {
          return new Promise((resolve, reject) => {
            let photoQueryString = `INSERT INTO photos (answer_id, url) VALUES(${answer_id}, '${photo}');`;
            db.query(photoQueryString, (err, photoData) => {
              if(err) {
                reject(err);
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
          reject(err);
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
          reject(err);
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
          reject(err);
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


// ************************ Pre Optimization Read Queries **************************

//GET Questions Only (must combine with second query)
//SELECT question_id, question_body, question_date, asker_name, reported, question_helpfulness FROM questions WHERE product_id=1;

//GET Answers AND Photos
// SELECT a.question_id, a.id, a.body, a.date, a.answerer_name, a.helpfulness, JSON_ARRAYAGG(p.url) AS photos FROM answers a INNER JOIN photos p ON a.id=p.answer_id  WHERE question_id=1 GROUP BY a.id;


// ************************ Post Optimization Read Queries **************************

//GET Questions Answers and Photos In One Query

// 1. SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECT('id', a.id, 'body', a.body) AS answers FROM questions q INNER JOIN answers a ON q.question_id=a.question_id WHERE product_id=1;

// 2. SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, (SELECT a.body FROM answers WHERE id=a.id)) AS answers FROM questions q INNER JOIN answers a ON q.question_id=a.question_id WHERE product_id=1 GROUP BY q.question_id;


// 3. SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness)) AS answers FROM questions q INNER JOIN answers a ON q.question_id=a.question_id WHERE product_id=1 GROUP BY q.question_id;

// 4. SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', JSON_ARRAY(1, 2, 3))) AS answers FROM questions q INNER JOIN answers a ON q.question_id=a.question_id WHERE product_id=1 GROUP BY q.question_id;


// 5. SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(a.body) AS photos FROM answers a WHERE a.id=5 GROUP BY a.id))) AS answers FROM questions q INNER JOIN answers a ON q.question_id=a.question_id WHERE product_id=1 GROUP BY q.question_id;


//Need to join where answer_id = the question_id where product_id = input
// 6. SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) AS photos FROM answers a LEFT JOIN photos p ON a.id=p.answer_id WHERE a.id=5 GROUP BY a.id))) AS answers FROM questions q INNER JOIN answers a ON q.question_id=a.question_id WHERE product_id=1 GROUP BY q.question_id;

//ROAD BLOCK Error Subquery returns more than 1 row
// SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) AS photos FROM answers a LEFT JOIN photos p ON a.id=p.answer_id WHERE a.id=5 GROUP BY a.id))) AS answers FROM questions q INNER JOIN answers a ON q.question_id=a.question_id WHERE product_id=1 GROUP BY q.question_id;


//Trying to build from inside out

//1. SELECT JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) FROM photos p LEFT JOIN answers a ON p.answer_id=a.id LEFT JOIN questions q on a.question_id=q.question_id WHERE q.product_id=1)) AS answers FROM answers a INNER JOIN questions q ON a.question_id=q.question_id WHERE q.product_id=1;


//2. SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) FROM photos p LEFT JOIN answers a ON p.answer_id=a.id LEFT JOIN questions q on a.question_id=q.question_id WHERE q.product_id=1)) AS answers FROM answers a INNER JOIN questions q ON a.question_id=q.question_id WHERE q.product_id=1;


// SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) FROM photos p LEFT JOIN answers a ON p.answer_id=a.id LEFT JOIN questions q on a.question_id=q.question_id WHERE q.product_id=1))) AS answers FROM answers a INNER JOIN questions q ON a.question_id=q.question_id WHERE q.product_id=1;