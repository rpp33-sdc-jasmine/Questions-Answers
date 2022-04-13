const db = require('../db').dbConnection;
const utils = require('../utils.js');
let question_id = 3518966;
let answer_id = 6879309;
let photo_id = 2063760;

//TODO: Pooling connections
db.connect()

const getQuestions = (id) => {
    const questionQuery = `SELECT question_id, question_body, question_date, asker_name, reported, question_helpfulness FROM questions WHERE product_id=${id}`;
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
    const questionFields = 'question_id, product_id, question_body, question_date, asker_name, email, question_helpfulness, reported, id_key';
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO questions (${questionFields}) VALUES (${question_id}, ${question.product_id}, "${question.body}", UNIX_TIMESTAMP(), "${question.name}", "${question.email}", 0, 0, UUID())`, (err, data) => {
        if (err) {
            reject(err);
        } else {
          question_id++
          resolve('Success Posting Question');
        }
      })
    })
  };

  const postAnswer = (data) => {
    // TODO: answer_id needs to be autoincremented from the last question
    // TODO: If photo insert is not successful, rollback answer insert
    return new Promise((resolve, reject) => {
      let answerQueryString = `INSERT INTO answers (id, question_id, body, date, answerer_name, email, helpfulness, reported, id_key) VALUES(${answer_id}, ${data.question_id}, '${data.body}', UNIX_TIMESTAMP(), '${data.name}', '${data.email}', 0, 0, UUID());`;
      db.query(answerQueryString, (err, answerData) => {
        if (err) {
          reject(err);
        }
        let promises = data.photos.map((photo) => {
          return new Promise((resolve, reject) => {
            let photoQueryString = `INSERT INTO photos (photo_id, answer_id, url, id_key) VALUES(${photo_id}, ${answer_id}, '${photo}', UUID());`;
            db.query(photoQueryString, (err, photoData) => {
              if(err) {
                reject(err);
              }
              photo_id++;
              resolve(photoData);
            })
          })
        })
        answer_id++;
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

  const putReported = (id, table) => {
    let idType;
    table === 'answers' ? idType = 'id' : idType = 'question_id'
    let queryString = `UPDATE ${table} SET reported=1 WHERE ${idType}=${id};`

    return new Promise((resolve, reject) => {
      db.query(queryString, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve('Success Reporting');
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
     putReported
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



// 6. SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) AS photos FROM answers a INNER JOIN photos p ON a.id=p.answer_id WHERE a.id=5 GROUP BY a.id))) AS answers FROM questions q INNER JOIN answers a ON q.question_id=a.question_id WHERE product_id=1 GROUP BY q.question_id;

//Error Subquery returns more than 1 row
// SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, JSON_OBJECTAGG(a.id, JSON_OBJECT('id', a.id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'helpfulness', a.helpfulness, 'photos', (SELECT JSON_ARRAYAGG(p.url) AS photos FROM answers a LEFT JOIN photos p ON a.id=p.answer_id LEFT JOIN questions q ON a.question_id=q.question_id GROUP BY a.id))) AS answers FROM questions q INNER JOIN answers a ON q.question_id=a.question_id WHERE product_id=1 GROUP BY q.question_id;





// SELECT a.question_id, a.id, a.body, a.date, a.answerer_name, a.helpfulness JSON_ARRAYAGG(p.url) AS photos FROM answers a INNER JOIN photos p ON a.id=p.answer_id WHERE a.question_id=84 GROUP BY a.id;

// SELECT a.question_id, a.id, a.body, a.date, a.answerer_name, a.helpfulness, JSON_ARRAYAGG(p.url) AS photos FROM answers a LEFT JOIN photos p ON a.id=p.answer_id  WHERE a.question_id=1 GROUP BY a.id;