const mysql = require('mysql');
const dbConnection = require('../db/index.js').dbConnection;
const model = require('../model/index.js');

describe('Database Connection', () => {
  beforeEach(() => {
    dbConnection.connect();
  })
  afterEach(() => {
    dbConnection.end();
  })
  test('Can connect to questions_answers database', () => {
    expect(dbConnection.config.database).toBe('questions_answers');
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