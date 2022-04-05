const express = require('express');
const db = require('../db/index.js').dbConnection;
const models = require('../model/index.js');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/qa/questions', (req, res) => {
  const params = {
    id: req.query.product_id,
    page: req.query.page,
    count: req.query.count
  }
    res.status(200).send(params);
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const id = req.params.question_id
  res.status(200).send(id);
});

app.post('/qa/questions', (req, res) => {
  data = {
    body: req.query.body,
    name: req.query.name,
    email: req.query.email,
    product_id: req.query.product_id
  }
  res.status(201).send(data);
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  data = {
    body: req.query.body,
    name: req.query.name,
    email: req.query.email,
    photos: req.query.photos,
    question_id: req.params.question_id
  }
  res.status(201).send(data);
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  id = req.params.question_id;
  res.status(201).send('Success Updating Question Helpfulness');
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  id = req.params.question_id;
  res.status(201).send('Success Reporting Question');
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  id = req.params.answer_id;
  res.status(201).send('Success Updating Answer Helpfulness');
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  id = req.params.answer_id;
  res.status(201).send('Success Reporting Answer');
})

app.listen(port, () => {
  console.log(`Listening at Localhost: ${port}`);
});
