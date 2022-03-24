const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/questions-answers');
console.log('Connected to Mongo Database');

const questionSchema = new mongoose.Schema({
  question_id: Number,
  product_id: Number,
  question_body: String,
  question_date: Number,
  asker_name: String,
  email: String,
  question_helpfulness: Number,
  reported: Boolean
});

const answerSchema = new mongoose.Schema({
  id: Number,
  answer_id: Number,
  body: String,
  answer_date: Number,
  answerer_name: String,
  email: String,
  answer_helpfulness: Number,
  reported: Boolean
});

const photoSchema = new mongoose.Schema({
  id: Number,
  answer_id: Number,
  url: String
})


let Question = mongoose.model('Question', questionSchema);
let Answer = mongoose.model('Answer', answerSchema);
let Photo = mongoose.model('Photo', photoSchema);

const addQuestion = (data) => {
  let question = new Question({
    question_id: data.id,
    product_id: data.product_id,
    question_body: data.body,
    question_date: data.date,
    asker_name: data.name,
    email: data.email,
    question_helpfulness: data.helpfulness,
    reported: data.reported
  })
  question.save((err) => {
    if (err) {
      console.log('Error saving to DB', err)
    }
  })
}

const data = {
  id: 1,
  product_id: 1,
  body: 'This is the body of the question',
  date: 1234556789123,
  name: 'Caitlin',
  email: 'caitlin.p.winters@gmail.com',
  helpfulness: 0,
  reported: 0
}
addQuestion(data);


