const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('../model/index.js');
const utils = require('../utils.js')
const port = 4000;


const makeApp = function(models) {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.get('/qa/questions', (req, res) => {
    const params = {
      id: req.query.product_id,
      page: req.query.page,
      count: req.query.count
    };
    models.getQuestions(params.id)
    .then((questions) => {
     questions = questions.results;
     let promises = questions.map((question) => {
        return models.getAnswers(question);
     })
     Promise.all(promises)
     .then((answers) => {
       answers = answers[0];
       questions.forEach(question => {
         question.question_date = new Date(question.question_date * 1000);
         question.reported = question.reported === 1;
         question.answers = {};
         answers.forEach(answer => {
           if (answer.question_id === question.question_id) {
             question.answers[answer.id] = {
               id: answer.id,
               body: answer.body,
               date: new Date(answer.date * 1000),
               answerer_name: answer.answerer_name,
               helpfulness: answer.helpfulness,
               photos: answer.photos };
           }
         })
       })
       res.status(200).send({ product_id: 1, results: questions });
      })
      .catch((err) => {
        res.status(500).send(err);
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
  });

  app.post('/qa/questions', (req, res) => {
    const params = {
      body: req.query.body,
      name: req.query.name,
      email: req.query.email,
      product_id: req.query.product_id
    };
    models.postQuestion(params)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
  });

  app.get('/qa/questions/:question_id/answers', (req, res) => {
    const params = {
      question_id: req.params.question_id,
      page: req.query.page || 1,
      count: req.query.count || 5
    }
    models.getAnswers(params)
    .then((results) => {
      results.forEach((answer) => {
        console.log('an answer', answer);
        delete answer.question_id
        answer.date = new Date(answer.date * 1000);
      })
      res.status(200).send({ question: params.question_id, page: params.page, count: params.count, results });
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  });

  app.post('/qa/questions/:question_id/answers', (req, res) => {
    const params = {
      body: req.query.body,
      name: req.query.name,
      email: req.query.email,
      photos: utils.transformPhotosFromClient(req.query.photos),
      question_id: req.params.question_id
    }
    models.postAnswer(params)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
  });

  app.put('/qa/questions/:question_id/helpful', (req, res) => {
    const id = req.params.question_id;
    models.putHelpful(id, 'questions')
    .then((result) => {
      res.status(201).send(result);
    })
    .catch(() => {
      res.status(500).send(err);
    })
  })

  app.put('/qa/answers/:answer_id/helpful', (req, res) => {
    const id = req.params.answer_id;
    models.putHelpful(id, 'answers')
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  })

  app.put('/qa/questions/:question_id/report', (req, res) => {
    const id = req.params.question_id;
    models.putReported(id, 'questions')
    .then((result) => {
      res.status(201).send(result);
    })
    .catch(() => {
      res.status(500).send(err);
    })
  })

  app.put('/qa/answers/:answer_id/report', (req, res) => {
    const id = req.params.answer_id;
    models.putReported(id, 'answers')
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  })
  return app;
}

const app = makeApp(models);
app.listen(port, () => {
  console.log(`Listening at Localhost: ${port}`);
});

module.exports = makeApp;
