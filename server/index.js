const express = require('express');
const models = require('../model/index.js');
const bodyParser = require('body-parser');
const utils = require('../utils.js')
const port = 4000;


const makeApp = function(models) {
  const app = express();
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  //DONE EXCEPT FOR WEIRD ARRAY JSON THING
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
        return models.getAnswers(question.question_id);
     })
     Promise.all(promises)
     .then((answers) => {
       answers = answers[0];
       questions.forEach(question => {
         question.answers = {};
         answers.forEach(answer => {
           if (answer.question_id === question.question_id) {
             console.log(answer.id);
             question.answers[answer.id] = { id: answer.id, body: answer.body, date: answer.date, answerer_name: answer.answerer_name, helpfulness: answer.helpfulness, photos: answer.photos };
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

  //DONE!
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

  //DONE EXCEPT FOR WEIRD ARRAY JSON THING
  app.get('/qa/questions/:question_id/answers', (req, res) => {
    const params = {
      id: req.params.question_id,
      page: req.query.page || 1,
      count: req.query.count || 5
    }
    models.getAnswers(params)
    .then((results) => {
      res.status(200).send({ question: data.id, page: data.page, count: data.count, results });
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  });

  //DONE!
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

  //DONE!
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

  //DONE!
  app.put('/qa/answers/:answer_id/helpful', (req, res) => {
    const id = req.params.answer_id;
    console.log('The answer id', id);
    models.putHelpful(id, 'answers')
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  })

  //DONE!
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

  //DONE!
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


[
  {
      "question_id": 1,
      "question_body": "What fabric is the top made of?",
      "question_date": 2147483647,
      "asker_name": "yankeelover",
      "reported": 1,
      "question_helpfulness": 0,
      "answers": {
          "6879307": {
              "answer": {
                  "question_id": 1,
                  "id": 6879307,
                  "body": "what is going on with this array",
                  "date": 1649440047,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\"]"
              }
          },
          "6879308": {
              "answer": {
                  "question_id": 1,
                  "id": 6879308,
                  "body": "okay, will all my photos show up?",
                  "date": 1649435280,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.omg.com\", \"www.omg.com\", \"www.url.com\", \"www.url.com\"]"
              }
          }
      }
  },
  {
      "question_id": 2,
      "question_body": "HEY THIS IS A WEIRD QUESTION!!!!?",
      "question_date": 2147483647,
      "asker_name": "jbilas",
      "reported": 4,
      "question_helpfulness": 1,
      "answers": {
          "6879307": {
              "answer": {
                  "question_id": 1,
                  "id": 6879307,
                  "body": "what is going on with this array",
                  "date": 1649440047,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\"]"
              }
          },
          "6879308": {
              "answer": {
                  "question_id": 1,
                  "id": 6879308,
                  "body": "okay, will all my photos show up?",
                  "date": 1649435280,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.omg.com\", \"www.omg.com\", \"www.url.com\", \"www.url.com\"]"
              }
          }
      }
  },
  {
      "question_id": 3,
      "question_body": "Does this product run big or small?",
      "question_date": 2147483647,
      "asker_name": "jbilas",
      "reported": 8,
      "question_helpfulness": 0,
      "answers": {
          "6879307": {
              "answer": {
                  "question_id": 1,
                  "id": 6879307,
                  "body": "what is going on with this array",
                  "date": 1649440047,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\"]"
              }
          },
          "6879308": {
              "answer": {
                  "question_id": 1,
                  "id": 6879308,
                  "body": "okay, will all my photos show up?",
                  "date": 1649435280,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.omg.com\", \"www.omg.com\", \"www.url.com\", \"www.url.com\"]"
              }
          }
      }
  },
  {
      "question_id": 4,
      "question_body": "How long does it last?",
      "question_date": 2147483647,
      "asker_name": "funnygirl",
      "reported": 6,
      "question_helpfulness": 0,
      "answers": {
          "6879307": {
              "answer": {
                  "question_id": 1,
                  "id": 6879307,
                  "body": "what is going on with this array",
                  "date": 1649440047,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\"]"
              }
          },
          "6879308": {
              "answer": {
                  "question_id": 1,
                  "id": 6879308,
                  "body": "okay, will all my photos show up?",
                  "date": 1649435280,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.omg.com\", \"www.omg.com\", \"www.url.com\", \"www.url.com\"]"
              }
          }
      }
  },
  {
      "question_id": 5,
      "question_body": "Can I wash it?",
      "question_date": 2147483647,
      "asker_name": "cleopatra",
      "reported": 7,
      "question_helpfulness": 0,
      "answers": {
          "6879307": {
              "answer": {
                  "question_id": 1,
                  "id": 6879307,
                  "body": "what is going on with this array",
                  "date": 1649440047,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\"]"
              }
          },
          "6879308": {
              "answer": {
                  "question_id": 1,
                  "id": 6879308,
                  "body": "okay, will all my photos show up?",
                  "date": 1649435280,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.omg.com\", \"www.omg.com\", \"www.url.com\", \"www.url.com\"]"
              }
          }
      }
  },
  {
      "question_id": 6,
      "question_body": "Is it noise cancelling?",
      "question_date": 2147483647,
      "asker_name": "coolkid",
      "reported": 19,
      "question_helpfulness": 1,
      "answers": {
          "6879307": {
              "answer": {
                  "question_id": 1,
                  "id": 6879307,
                  "body": "what is going on with this array",
                  "date": 1649440047,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\"]"
              }
          },
          "6879308": {
              "answer": {
                  "question_id": 1,
                  "id": 6879308,
                  "body": "okay, will all my photos show up?",
                  "date": 1649435280,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.omg.com\", \"www.omg.com\", \"www.url.com\", \"www.url.com\"]"
              }
          }
      }
  },
  {
      "question_id": 3518964,
      "question_body": "inserting from postman",
      "question_date": 1649432263,
      "asker_name": "undefined",
      "reported": null,
      "question_helpfulness": null,
      "answers": {
          "6879307": {
              "answer": {
                  "question_id": 1,
                  "id": 6879307,
                  "body": "what is going on with this array",
                  "date": 1649440047,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.omg.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.it.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.works.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.yes.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.url.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.try.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\", \"www.again.com\"]"
              }
          },
          "6879308": {
              "answer": {
                  "question_id": 1,
                  "id": 6879308,
                  "body": "okay, will all my photos show up?",
                  "date": 1649435280,
                  "answerer_name": "caiwin",
                  "helpfulness": 0,
                  "photos": "[\"www.omg.com\", \"www.omg.com\", \"www.url.com\", \"www.url.com\"]"
              }
          }
      }
  }
]