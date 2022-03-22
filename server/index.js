const express = require('express');
const db = require('../db/index.js').dbConnection;
const models = require('../model/index.js');
const app = express();
const port = 4000;


app.get('/', (req, res) => {
  models.getQuestions((res) => {
    console.log('should be empty', res);
  })
})

app.listen(port, () => {
  console.log(`Listening at Localhost: ${port}`);
});