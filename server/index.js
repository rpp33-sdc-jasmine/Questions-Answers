const express = require('express');
const db = require('../db/index.js').dbConnection;
const models = require('../model/index.js');
const app = express();
const port = 4000;


app.get('/', (req, res) => {
  const id = 1;
  models.getQuestions(id)
  .then((response) => {
    res.status(200).send(response)
  })
  .catch((err) => {
    console.log('Error Retrieving Questions and Answers from Database', err);
  })
});
app.get('/question', (req, res) => {
  let question = req.query;
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


// app.get('/', (req, res) => {
//   const id = 1;
//   models.getQuestions(id, (results) => {
//     let data = {
//       product_id: id,
//       results: results
//     }
//     res.status(200).send(data);
//   });
// });