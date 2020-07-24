CREATE TABLE if not exists user (
  username varchar(20) NOT NULL,
  password varchar(200) NOT NULL,
  nickname varchar(200) NOT NULL,
  gender varchar(10) NOT NULL,
  phonenumber varchar(100) NOT NULL,
  PRIMARY KEY (username)
);

CREATE TABLE if not exists promotion (
  title varchar(40) NOT NULL,
  image mediumblob NOT NULL,
  startdate timestamp NOT NULL,
  enddate timestamp NOT NULL,
  ruletext varchar(1000) NOT NULL,
  PRIMARY KEY (title)
);

CREATE TABLE if not exists card (
    id bigint NOT NULL AUTO_INCREMENT,
    cardname varchar(20) NOT NULL,
    cardimage mediumblob NOT NULL,
    probability double NOT NULL,
    promotiontitle varchar(40) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (promotiontitle) REFERENCES promotion(title)
);

CREATE TABLE if not exists helprecord (
  id bigint NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  promotiontitle varchar(40) NOT NULL,
  helper varchar(20) NOT NULL,
  helpedat timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (username) REFERENCES user(username),
  FOREIGN KEY (helper) REFERENCES user(username),
  FOREIGN KEY (promotiontitle) REFERENCES promotion(title)
);

CREATE TABLE if not exists user_card (
  id bigint NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  cardid bigint NOT NULL,
  gotat timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (username) REFERENCES user(username),
  FOREIGN KEY (cardid) REFERENCES card(id)
);

CREATE TABLE if not exists user_promotion (
  id bigint NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  promotiontitle varchar(40) NOT NULL,
  chances int NOT NULL,
  haveinvited int NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (username) REFERENCES user(username),
  FOREIGN KEY (promotiontitle) REFERENCES promotion(title)
);
