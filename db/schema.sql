CREATE DATABASE questions_answers;

USE questions_answers

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  question_id INT NOT NULL,
  product_id INT NOT NULL,
  question_body VARCHAR(1000),
  question_date INT(11),
  asker_name VARCHAR(30),
  email VARCHAR(50),
  question_helpfulness INT,
  reported BOOLEAN
);

DROP TABLE IF EXISTS answers;
CREATE TABLE answers (
  id INT NOT NULL,
  question_id INT NOT NULL,
  body VARCHAR(1000),
  date INT(11),
  answerer_name VARCHAR(30),
  email VARCHAR(30),
  helpfulness INT,
  reported BOOLEAN
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

ALTER TABLE questions ADD COLUMN id_key varchar(36) NOT NULL;
UPDATE questions SET id_key = UUID();
ALTER TABLE questions ADD PRIMARY KEY (id_key);

LOAD DATA LOCAL INFILE '/Users/caitlinwinters/Desktop/Questions-Answers-Data/answers.csv'
INTO TABLE answers
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

ALTER TABLE answers ADD COLUMN id_key varchar(36) NOT NULL;
UPDATE answers SET id_key = UUID();
ALTER TABLE answers ADD PRIMARY KEY (id_key);

LOAD DATA LOCAL INFILE '/Users/caitlinwinters/Desktop/Questions-Answers-Data/answers_photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '\"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

ALTER TABLE photos ADD COLUMN id_key varchar(36) NOT NULL;
UPDATE photos SET id_key = UUID();
ALTER TABLE photos ADD PRIMARY KEY (id_key);
