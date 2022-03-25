const sum = require('./sum');
const mysql = require('mysql');
const model = require('../model/index.js');
const db = require('../db/index.js');

describe('Database Model Methods', () => {
  test('Get Questions Methods Exist', () => {
    //TODO: Expect to be a function
    console.log(model.getQuestions, 'what is it');
    expect(model.getQuestions).toBeInstanceOf(Function);
  });
  test('Post Questions Methods Exist', () => {
    //TODO: Expect to be a function
  });
  test('Get Answers Methods Exist', () => {
    //TODO: Expect to be a function
  });
  test('Post Answers Methods Exist', () => {
    //TODO: Expect to be a function
  });
  test('Post Helpful', () => {
    //TODO: Expect to be a function
  });
  test('Post Reported', () => {
    //TODO: Expect to be a function
  });
  afterAll((done) => {
    // Do I need this?
    done();
  });
});


// //Mocking database to test insertions
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