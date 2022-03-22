CREATE DATABASE questions_answers;

USE questions_answers

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  id VARCHAR(36) NOT NULL,
  PRIMARY KEY (id),
  question_id INT NOT NULL,
  product_id INT NOT NULL,
  date DATETIME,
  asker_name VARCHAR(30),
  question_helpfulness INT,
  reported BOOLEAN
);

DROP TABLE IF EXISTS answers;
CREATE TABLE answers (
  id VARCHAR(36) NOT NULL,
  PRIMARY KEY (id),
  answer_id INT NOT NULL,
  question_id INT NOT NULL,
  answer_date DATETIME,
  answerer_name VARCHAR(30),
  answer_helpfulness INT
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  id VARCHAR(36) NOT NULL,
  PRIMARY KEY (id),
  photo_id INT NOT NULL,
  answer_id INT NOT NULL,
  url VARCHAR(300)
);