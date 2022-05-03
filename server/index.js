const newrelic = require('newrelic')
const express = require('express');
// const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('../model/index.js');
const utils = require('../utils.js');
const port = 4000;

const makeApp = function(models) {
  const app = express();
  // const client = redis.createClient(6379);
  // client.connect();
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());


  // // //Cache middleware
  // const checkQuestionInCache = (req, res, next) =>{
  //   client.get('product' + req.query.product_id)
  //   .then((result) => {
  //     if(result !== null){
  //       res.send(JSON.parse(result));
  //     } else {
  //       next();
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('Error:' + err);
  //   })
  // }

  // const checkAnswerInCache = (req, res, next) =>{
  //   client.get('question' + req.params.question_id)
  //   .then((result) => {
  //     if(result !== null){
  //       res.send(JSON.parse(result));
  //     } else {
  //       next();
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('Error:' + err);
  //   })
  // }

  //Loader.io Verification
  app.get('/loaderio-9f0836452b34e6f1983a647c8db4f40f/', (req, res) => {
    res.status(200).send('loaderio-9f0836452b34e6f1983a647c8db4f40f');
  });

  app.get('/qa/questions', (req, res) => { //checkQuestionInCache
    const params = {
      id: req.query.product_id,
      page: req.query.page,
      count: req.query.count
    };
    models.getQuestions(params.id)
    .then((result) => {
      // client.set('product' + params.id, JSON.stringify(result));
      res.status(200).send({result});
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

  app.get('/qa/questions/:question_id/answers', (req, res) => { //checkAnswerInCache
    const params = {
      question_id: req.params.question_id,
      page: req.query.page || 1,
      count: req.query.count || 5
    }
    models.getAnswers(params)
    .then((result) => {
      // client.set('question' + params.question_id, JSON.stringify(result));
      res.status(200).send({ question: params.question_id, page: params.page, count: params.count, result });
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log('The error is:', err);
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
    models.putQuestionReported(id)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch(() => {
      res.status(500).send(err);
    })
  })

  app.put('/qa/answers/:answer_id/report', (req, res) => {
    const id = req.params.answer_id;
    models.putAnswerReported(id)
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
