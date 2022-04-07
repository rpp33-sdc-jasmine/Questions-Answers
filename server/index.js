const express = require('express');
const db = require('../db/index.js').dbConnection;
const models = require('../model/index.js');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/qa/questions', (req, res) => {
  let params = {
    id: req.query.product_id,
    page: req.query.page,
    count: req.query.count
  }
  // models.getQuestions(params.id)
  // .then((data) => {

  // })
  res.status(200).send('Success Getting Questions');
});

app.post('/qa/questions', (req, res) => {
  data = {
    body: req.query.body,
    name: req.query.name,
    email: req.query.email,
    product_id: req.query.product_id
  }
  res.status(201).send('Success Posting Question');
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const id = req.params.question_id
  res.status(200).send('Success Getting Answers');
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  data = {
    body: req.query.body,
    name: req.query.name,
    email: req.query.email,
    photos: req.query.photos.substring(1, req.query.photos.length -1).split(','),
    question_id: req.params.question_id
  }
  models.postAnswer(data)
  .then((result) => {
    res.status(201).send('Success Posting Answer');
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Unable To Post Answer');
  })
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const id = req.params.question_id;
  models.putHelpful(id, 'questions')
  .then((result) => {
    res.status(201).send('Success Updating Question Helpfulness');
  })
  .catch(() => {
    res.status(500).send('Unable To Update Question Helpfulness');
  })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const id = req.params.answer_id;
  console.log('The answer id', id);
  models.putHelpful(id, 'answers')
  .then((result) => {
    res.status(201).send('Success Updating Answer Helpfulness');
  })
  .catch(() => {
    res.status(500).send('Unable To Update Answer Helpfulness');
  })
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  const id = req.params.question_id;
  models.putReported(id, 'questions')
  .then((result) => {
    res.status(201).send('Success Reporting Question');
  })
  .catch(() => {
    res.status(500).send('Unable To Report Question');
  })
})


app.put('/qa/answers/:answer_id/report', (req, res) => {
  const id = req.params.answer_id;
  models.putReported(id, 'answers')
  .then((result) => {
    res.status(201).send('Success Reporting Answer');
  })
  .catch(() => {
    res.status(500).send('Unable To Report Answer');
  })
})

app.listen(port, () => {
  console.log(`Listening at Localhost: ${port}`);
});
