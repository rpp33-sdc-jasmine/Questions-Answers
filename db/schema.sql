CREATE DATABASE questions_answers;

USE questions_answers

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  question_id INT NOT NULL,
  product_id INT NOT NULL,
  body VARCHAR(1000),
  date_written VARCHAR(13),
  asker_name VARCHAR(30),
  email VARCHAR(50),
  reported BOOLEAN,
  question_helpfulness INT
);

DROP TABLE IF EXISTS answers;
CREATE TABLE answers (
  answer_id INT NOT NULL,
  question_id INT NOT NULL,
  body VARCHAR(1000),
  date_written VARCHAR(13),
  answerer_name VARCHAR(30),
  reported BOOLEAN,
  answer_helpfulness INT
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  photo_id INT NOT NULL,
  answer_id INT NOT NULL,
  url VARCHAR(300)
);

LOAD DATA LOCAL INFILE '/Users/caitlinwinters/Desktop/Questions-Answers-Data/questions.csv'
INTO TABLE questions
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

ALTER TABLE questions ADD COLUMN id varchar(36);
UPDATE questions SET id = UUID();

LOAD DATA LOCAL INFILE '/Users/caitlinwinters/Desktop/Questions-Answers-Data/answers.csv'
INTO TABLE answers
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

ALTER TABLE answers ADD COLUMN id varchar(36);
UPDATE answers SET id = UUID();

LOAD DATA LOCAL INFILE '/Users/caitlinwinters/Desktop/Questions-Answers-Data/answers_photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

ALTER TABLE photos ADD COLUMN id varchar(36);
UPDATE photos SET id = UUID();