const express = require('express');
const db = require('../db/index.js').dbConnection;
const models = require('../model/index.js');
const app = express();
const port = 4000;


app.get('/', (req, res) => {
  models.getQuestions((data) => {
    console.log('should be tootsies', data);
  });
  res.end('All done');
});

app.get('/question', (req, res) => {
  // let question = req.query;
  let question = {
    'question_id': 1,
    'product_id': 2,
    body: 'This is the body of the question',
    'asker_name': 'Caitlin',
    email: 'caitlin.p.winters@gmail.com'
  }
  models.postQuestion(question, (err, data) => {
    if (err) {
      console.log('Error inserting question into db', err)
    } else {
      console.log('Success inserting data into db', data)
    }
  });
  res.end('Question posted');
});

app.listen(port, () => {
  console.log(`Listening at Localhost: ${port}`);
});