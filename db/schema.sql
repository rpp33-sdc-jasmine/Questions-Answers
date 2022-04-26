DROP DATABASE IF EXISTS questions_answers;

CREATE DATABASE questions_answers;

USE questions_answers;

CREATE TABLE questions (
  question_id INT NOT NULL,
  product_id INT NOT NULL,
  question_body VARCHAR(1000),
  question_date INT(11),
  asker_name VARCHAR(30),
  email VARCHAR(50),
  reported INT,
  question_helpfulness INT,
  PRIMARY KEY (question_id)
);

CREATE INDEX questions ON questions (product_id, question_id);

CREATE TABLE answers (
  id INT NOT NULL,
  question_id INT NOT NULL,
  body VARCHAR(1000),
  date INT(11),
  answerer_name VARCHAR(30),
  email VARCHAR(30),
  reported INT,
  helpfulness INT,
  PRIMARY KEY (id)
);

CREATE INDEX answers ON answers (question_id, id);

CREATE TABLE photos (
  photo_id INT NOT NULL,
  answer_id INT NOT NULL,
  url VARCHAR(300),
  PRIMARY KEY (photo_id)
);

CREATE INDEX photos ON photos (answer_id, photo_id);

LOAD DATA LOCAL INFILE '/Users/caitlinwinters/Desktop/Questions-Answers-Data/questions.csv'
INTO TABLE questions
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/caitlinwinters/Desktop/Questions-Answers-Data/answers.csv'
INTO TABLE answers
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/caitlinwinters/Desktop/Questions-Answers-Data/answers_photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

ALTER TABLE questions MODIFY COLUMN question_id INT auto_increment;
ALTER TABLE answers MODIFY COLUMN id INT auto_increment;
ALTER TABLE photos MODIFY COLUMN photo_id INT auto_increment;

