const mysql = require('mysql');
const dbConnection = require('../db/index.js').dbConnection;
const request = require('supertest');
const makeApp= require('../server/index.js');
// Atomicity test -  will ensure any transaction performed on this table is all or none i.e. no records are updated if any step of the transaction is failed.
// Consistency test - will ensure that whenever the value in column A or B is updated, the sum always remains 100. It won’t allow insertion/deletion/update in A or B if the total sum is anything other than 100.
// Isolation test - will ensure that if two transactions are happening at the same time and trying to modify the data of the ACID test table, then these tractions are executing in isolation.
// Durability test - will ensure that once a transaction over this table has been committed, it will remain so, even in the event of power loss, crashes, or errors.

describe('Database Setup', () => {
  beforeAll(() => {
    dbConnection.connect();
  });
  afterAll(() => {
    dbConnection.end();
  });
  test('Can connect to questions_answers database', (done) => {
    expect(dbConnection.config.database).toBe('questions_answers');
    done();
  });

  //Are there too many unecesary tests here?
  test('Questions table field "asker_name" is of type varchar', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="asker_name";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('varchar');
      done();
    })
  });
  test('Questions table field "body" is of type varchar', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="question_body";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('varchar');
      done();
    })
  });
  test('Questions table field "question_date" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="question_date";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Questions table field "email" is of type varchar', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="email";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('varchar');
      done();
    })
  });
  test('Questions table field "question_id" is of type varchar', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="question_id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Questions table field "product_id" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="product_id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Questions table field "question_helpfulness" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="question_helpfulness";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Questions table field "question_id" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="question_id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Questions table field "reported" is of type tinyint', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="reported";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('tinyint');
      done();
    })
  });
  test('Answers table field answer "helpfulness" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="answers" and column_name="helpfulness";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Answers table field "id" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="answers" and column_name="id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Answers table field "answerer_name" is of type varchar', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="answers" and column_name="answerer_name";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('varchar');
      done();
    })
  });
  test('Answers table field "body" is of type varchar', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="answers" and column_name="body";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('varchar');
      done();
    })
  });
  test('Answers table field answer "date" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="answers" and column_name="date";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Answers table field "question_id" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="answers" and column_name="question_id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Answers table field "reported" is of type tinyint', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="answers" and column_name="reported";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('tinyint');
      done();
    })
  });
  test('Photos table field "answer_id" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="photos" and column_name="answer_id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Photos table field "photo_id" is of type varchar', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="photos" and column_name="photo_id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Photos table field "answer_id" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="photos" and column_name="answer_id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
});

const getQuestions = jest.fn();
const postQuestion = jest.fn();
const getAnswers = jest.fn();
const postAnswer = jest.fn();
const putHelpful = jest.fn();
const putReported = jest.fn();
const server = makeApp({
  getQuestions,
  postQuestion,
  getAnswers,
  postAnswer,
  putHelpful,
  putHelpful
})

describe('API Routes Produce Expected Status Codes and Responses', () => {
  test('/qa/questions GET request responds with status of 200 and correct response message', (done) => {
    request(server).get('/qa/questions')
    .end(function(err, res) {
      if (err) throw err;
      expect(200)
      expect(getQuestions.mock.calls.length).toBe(1);
      expect((res) => {
        res.text = 'Success Getting Questions';
      })
      return done();
    });
  })
  test('/qa/questions POST request responds with status of 201 and correct response message', (done) => {
    request(server)
    .post('/qa/questions')
    .send({
      body: 'test body',
      name: 'Caiwin',
      email: 'caiwin@gmail',
      product_id: 1
    })
    .end(function(err, res) {
      if (err) throw err;
      expect(res.statusCode).toBe(201);
      expect(postQuestion.mock.calls.length).toBe(1);
      expect(res.text).toBe('Success Posting Question');
      return done();
    });
  });
  test('/qa/questions/:question_id/answers GET request responds with status of 201 and correct response message', (done) => {
    request(server)
    .get('/qa/questions/:question_id/answers')
    .end(function(err, res) {
      if (err) throw err;
      expect(res.statusCode).toBe(200);
      expect(getAnswers.mock.calls.length).toBe(1);
      expect(res.text).toBe('Success Getting Answers');
      return done();
    });
  });
  test('/qa/questions/:question_id/helpful PUT request responds with status of 201 and correct response message', (done) => {
    request(server)
    .get('/qa/questions/:question_id/answers')
    .end(function(err, res) {
      if (err) throw err;
      expect(res.statusCode).toBe(201);
      expect(getAnswers.mock.calls.length).toBe(1);
      expect(res.text).toBe('Success Updating Question Helpfulness');
      return done();
    });
  });
  test('/qa/questions/:question_id/report PUT request responds with status of 201 and correct response message', (done) => {
    request(server)
    .get('/qa/questions/:question_id/report')
    .end(function(err, res) {
      if (err) throw err;
      expect(res.statusCode).toBe(201);
      expect(getAnswers.mock.calls.length).toBe(1);
      expect(res.text).toBe('Success Reporting Question');
      return done();
    });
  });
  test('/qa/answers/:answer_id/helpful PUT request responds with status of 201 and correct response message', (done) => {
    request(server)
    .get('/qa/answers/:answer_id/helpful')
    .end(function(err, res) {
      if (err) throw err;
      expect(res.statusCode).toBe(201);
      expect(getAnswers.mock.calls.length).toBe(1);
      expect(res.text).toBe('Success Updating Answer Helpfulness');
      return done();
    });
  });
  test('/qa/answers/:answer_id/report PUT request responds with status of 201 and correct response message', (done) => {
    request(server)
    .get('/qa/answers/:answer_id/report')
    .end(function(err, res) {
      if (err) throw err;
      expect(res.statusCode).toBe(201);
      expect(getAnswers.mock.calls.length).toBe(1);
      expect(res.text).toBe('Success Reporting Answer');
      return done();
    });
  });
});

//TODO: Implement Mock Database
// const mockOptions = {
  //   host: 'localhost',
  //   user: "admin",
  //   password: "password"
  // }
  // jest.mock('mysql');
  // const localDatabaseResultIsDifferentThanServer = 124;
  // const mysql = require('mysql');
  // const { getData } = require('./QueryHandler');

  // describe('Testing how Mocking works', () => {
    //     test('Can mock createConnection', (done) => {
      // -       mysql.createConnection = jest.fn();
      //         mysql.createConnection.mockImplementation(() => mysql.createConnection(mockOptions));

      //         getData().then((data) => {
        //             expect(data).toBe(localDatabaseResultIsDifferentThanServer);
        //         })

        //     })
        // })

// select * from information_schema.columns where table_schema='questions_answers' and table_name='photos';