const db = require('../db').dbConnection;
let question_id = 3518964;
let answer_id = 6879307;
let photo_id = 2063760;

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
  postAnswer: (data) => {
    db.connect();

    return new Promise((resolve, reject) => {
      let answerQueryString = `INSERT INTO answers (id, question_id, body, date, answerer_name, email, helpfulness, reported, id_key) VALUES(${answer_id}, ${data.question_id}, '${data.body}', UNIX_TIMESTAMP(), '${data.name}', '${data.email}', 0, 0, UUID());`;
      db.query(answerQueryString, (err, answerData) => {
        if (err) {
          reject(err);
        }
        console.log('answer data', answerData);
        data.photos.forEach((photo) => {
          photo = photo.substring(1, photo.length - 1);
          //need to create a procedure here? to get the last id?
          let photoQueryString = `INSERT INTO photos (photo_id, answer_id, url, id_key) VALUES(${photo_id}, ${answer_id}, '${photo}', UUID());`;
          db.query(photoQueryString, (err, photoData) => {
            if(err) {
              //delete the answer you just inserted
              reject(err);
            }
            console.log('photodata', photoData)
          })
        })
        resolve('Success Updating Answers and Photos');
      })
    })

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
          reject('Error Updating Question Helpfulness', err);
        } else {
          resolve(data);
        }
      })
    })
  },
  putReported: (id, table) => {
    db.connect();
    let queryString = `UPDATE ${table} SET reported=1 WHERE question_id=${id};`

    return new Promise((resolve, reject) => {
      db.query(queryString, (err, data) => {
        if (err) {
          //throw new error
          reject('Error Updating Question Reported', err);
        } else {
          resolve(data);
        }
      })
    })
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





// answer_id = 6879307;
// `INSERT INTO answers (id, question_id, body, date, answerer_name, helpfulness, reported, id_key) VALUES(${answer_id}, ${data.question_id}, '${data.body}', UNIX_TIMESTAMP(), '${data.name}', 0, 0, UUID());`;
// INSERT INTO answers (id, question_id, body, date, answerer_name, helpfulness, reported, id_key) VALUES(6879307, 1, 'some body and stuff', UNIX_TIMESTAMP(), 'caitlin', 0, 0, UUID());

// SELECT * FROM answers WHERE id = 6879308;

// SELECT * FROM answers ORDER BY question_id DESC LIMIT 1;

// SELECT * FROM answers WHERE answerer_name='caiwin';


// START TRANSACTION;
// INSERT INTO answers(id, question_id, body, id_key) VALUES (6879311, 1, 'this is some body added from a transaction', UUID());
// UPDATE answers SET email = 'caitli@gmail' WHERE id = 6879312;
// COMMIT;


// INSERT INTO photos (photo_id, answer_id, url) VALUES(2063760, 6879307, 'http://www.somephoto.com');