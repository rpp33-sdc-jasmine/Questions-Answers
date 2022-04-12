const mysql = require('mysql');
const dbConnection = require('../db/index.js').dbConnection;
const models = require('../model/index.js');
const request = require('supertest');
const makeApp= require('../server/index.js');


/**************************************** Database Testing *********************************************/
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

/**************************************** Model Unit Tests *********************************************/

describe('Database Model Methods Exist', () => {
  test('getQuestions is a function', () => {
    expect(models.getQuestions).toBeInstanceOf(Function);
  });
  test('postQuestion is a function', () => {
    expect(models.postQuestion).toBeInstanceOf(Function);
  });
  test('getAnswers is a function', () => {
    expect(models.getAnswers).toBeInstanceOf(Function);
  });
  test('postAnswer is a function', () => {
    expect(models.postAnswer).toBeInstanceOf(Function);
  });
  test('putHelpful is a function', () => {
    expect(models.putHelpful).toBeInstanceOf(Function);
  });
  test('putReported is a function', () => {
    expect(models.putReported).toBeInstanceOf(Function);
  });
});

/**************************************** API Testing *********************************************/
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
    request(server)
    .get('/qa/questions')
    .end((err, res) => {
      if (err) throw err;
      expect(res.text).toBe('Success Getting Questions');
      done(err);
    });
  });
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
      expect(res.text).toBe('Success Posting Question');
      done();
    });
  });
  test('/qa/questions/:question_id/answers GET request responds with status of 200 and correct response message', (done) => {
    const id = 1;
    request(server)
    .get('/qa/questions/' + id + '/answers')
    .expect(200, done);
  });
  test('/qa/questions/:question_id/helpful PUT request responds with status of 201 and correct response message', (done) => {
    const id = 1;
    request(server)
    .put('/qa/questions/' + id + '/helpful')
    .expect(201, done);
  });
  test('/qa/questions/:question_id/report PUT request responds with status of 201 and correct response message', (done) => {
    const id = 1;
    request(server)
    .put('/qa/questions/' + id + '/report')
    .expect(201, done);

  });
  test('/qa/answers/:answer_id/helpful PUT request responds with status of 201 and correct response message', (done) => {
    const id = 1;
    request(server)
    .put('/qa/answers/' + id + '/helpful')
    .expect(201, done);
  })
  test('/qa/answers/:answer_id/report PUT request responds with status of 201 and correct response message', (done) => {
    const id = 1;
    request(server)
    .put('/qa/answers/' + id + '/report')
    .expect(201, done);
  });
});

/**************************************** Utility Function Testing *********************************************/

/**************************************** Integration Testing *********************************************/

/**************************************** End to End Testing *********************************************/