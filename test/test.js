const mysql = require('mysql');
const dbConnection = require('../db/index.js').dbConnection;
const model = require('../model/index.js');


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
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="body";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('varchar');
      done();
    })
  });
  test('Questions table field "date_written" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="date_written";'
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
  test('Questions table field "id" is of type varchar', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('varchar');
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
  test('Answers table field "answer_helpfulness" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="answers" and column_name="answer_helpfulness";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Answers table field "answer_id" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="answers" and column_name="answer_id";'
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
  test('Answers table field "date_written" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="answers" and column_name="date_written";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      done();
    })
  });
  test('Answers table field "id" is of type varchar', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="answers" and column_name="id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('varchar');
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
  test('Photos table field "id" is of type varchar', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="photos" and column_name="id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('varchar');
      done();
    })
  });
  test('Photos table field "answer_id" is of type int', (done) => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="photos" and column_name="answer_id";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].DATA_TYPE).toBe('int');
      console.log(data);
      done();
    })
  });
  //TODO: Write tests for photos table
});

// Atomicity test -  will ensure any transaction performed on this table is all or none i.e. no records are updated if any step of the transaction is failed.
// Consistency test - will ensure that whenever the value in column A or B is updated, the sum always remains 100. It won’t allow insertion/deletion/update in A or B if the total sum is anything other than 100.
// Isolation test - will ensure that if two transactions are happening at the same time and trying to modify the data of the ACID test table, then these tractions are executing in isolation.
// Durability test - will ensure that once a transaction over this table has been committed, it will remain so, even in the event of power loss, crashes, or errors.
describe('Database Model Methods Exist', () => {
  test('getQuestions is a function', () => {
    expect(model.getQuestions).toBeInstanceOf(Function);
  });
  test('postQuestion is a function', () => {
    expect(model.postQuestion).toBeInstanceOf(Function);
  });
  test('getAnswers is a function', () => {
    expect(model.getAnswers).toBeInstanceOf(Function);
  });
  test('postAnswer is a function', () => {
    expect(model.postAnswer).toBeInstanceOf(Function);
  });
  test('putHelpful is a function', () => {
    expect(model.putHelpful).toBeInstanceOf(Function);
  });
  test('putReported is a function', () => {
    expect(model.putReported).toBeInstanceOf(Function);
  });
});

//TODO: Implement Mock Database to test insertions
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