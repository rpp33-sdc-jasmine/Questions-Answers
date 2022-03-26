const mysql = require('mysql');
const dbConnection = require('../db/index.js').dbConnection;
const model = require('../model/index.js');

// Atomicity test -  will ensure any transaction performed on this table is all or none i.e. no records are updated if any step of the transaction is failed.
// Consistency test - will ensure that whenever the value in column A or B is updated, the sum always remains 100. It won’t allow insertion/deletion/update in A or B if the total sum is anything other than 100.
// Isolation test - will ensure that if two transactions are happening at the same time and trying to modify the data of the ACID test table, then these tractions are executing in isolation.
// Durability test - will ensure that once a transaction over this table has been committed, it will remain so, even in the event of power loss, crashes, or errors.

describe('Database Connection', () => {
  beforeAll(() => {
    dbConnection.connect();
  });
  afterAll(() => {
    dbConnection.end();
  });
  test('Can connect to questions_answers database', () => {
    expect(dbConnection.config.database).toBe('questions_answers');
  });
  test('Questions table contain field "asker_name" of type varchar', () => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="asker_name";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].COLUMN_NAME).toBe('asker_name');
      expect(data[0].DATA_TYPE).toBe('varchar');
    })
  });
  test('Questions table contain field "body" of type varchar', () => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="body";'
    dbConnection.query(cols, (err, data) => {
      expect(data[0].COLUMN_NAME).toBe('body');
      expect(data[0].DATA_TYPE).toBe('varchar');
    })
  });
  test('Questions table contain field "date_written" of type int', () => {
    const cols = 'select * from information_schema.columns where table_schema="questions_answers" and table_name="questions" and column_name="date_written";'
    dbConnection.query(cols, (err, data) => {
      console.log(data);
      expect(data[0].COLUMN_NAME).toBe('date_written');
      expect(data[0].DATA_TYPE).toBe('int');
    })
  });
});


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

        // describe('Database Data Types', () => {
        //   beforeAll(() => {
        //     dbConnection.connect();
        //   })
        //   test('Questions table containers correct fields and datatypes', () => {
        //     const firstRow = 'SELECT * FROM questions WHERE name =\'question_id\' LIMIT 1';
        //     dbConnection.query()
        //     expect(dbConnection.query(firstRow)).toEqual(typeof Number);
        //   });
        //   afterAll(() => {
        //     dbConnection.end();
        //   })
        // });

// select * from information_schema.columns where table_schema='questions_answers' and table_name='questions';