DROP DATABASE IF EXISTS book_review;

CREATE DATABASE book_review;

USE book_review;

CREATE TABLE `USER` (UID BIGINT NOT NULL AUTO_INCREMENT, EMAIL VARCHAR(255), USERNAME VARCHAR(255), PASS VARCHAR(255), PRIMARY KEY (UID));

CREATE TABLE `COMMENT` (COMMENTID BIGINT NOT NULL AUTO_INCREMENT, CONTENT VARCHAR(255), 
`TIMESTAMP` DATETIME, USER_UID BIGINT, POST_POSTID BIGINT, PRIMARY KEY (COMMENTID));

CREATE TABLE `POST` (POSTID BIGINT NOT NULL AUTO_INCREMENT, BOOK_TITLE VARCHAR(255), BOOK_AUTHOR VARCHAR(255), PATH VARCHAR(255), REVIEW VARCHAR(255),
`TIMESTAMP` DATETIME, USER_UID BIGINT, VIEW BIGINT, PRIMARY KEY (POSTID));

CREATE TABLE `CATEGORY` (CATEGORYID BIGINT NOT NULL AUTO_INCREMENT, CATEGORY VARCHAR(255), PRIMARY KEY (CATEGORYID));

CREATE TABLE `RATE`(RATEID BIGINT NOT NULL AUTO_INCREMENT, USER_UID BIGINT, POST_POSTID BIGINT, 
PRIMARY KEY (RATEID));

CREATE TABLE `JOIN_POST_CATEGORY` (
POST_POSTID BIGINT,
CATEGORY_CATEGORYID BIGINT,
CONSTRAINT FK_JOIN_POST_CATEGORY_POST_POSTID FOREIGN KEY (POST_POSTID) REFERENCES POST(POSTID),
CONSTRAINT FK_JOIN_POST_CATEGORY_CATEGORY_CATEGORYID FOREIGN KEY (CATEGORY_CATEGORYID) REFERENCES CATEGORY(CATEGORYID));

ALTER TABLE `COMMENT` 
ADD CONSTRAINT FK_COMMENT_USER_UID FOREIGN KEY(USER_UID) REFERENCES `USER`(UID),
ADD CONSTRAINT FK_COMMENT_POST_POSTID FOREIGN KEY (POST_POSTID) REFERENCES POST(POSTID);

ALTER TABLE `POST` 
ADD CONSTRAINT FK_POST_USER_UID FOREIGN KEY (USER_UID) REFERENCES `USER`(UID);

ALTER TABLE `RATE` 
ADD CONSTRAINT FK_RATE_USER_UID FOREIGN KEY (USER_UID) REFERENCES `USER`(UID), 
ADD CONSTRAINT FK_RATE_POST_POSTID FOREIGN KEY (POST_POSTID) REFERENCES POST(POSTID);

INSERT INTO `USER` VALUE (NULL, "user1@gmailcom","user1", "123456");
INSERT INTO `USER` VALUE (NULL, "user2@gmailcom","user2", "123456");


INSERT INTO `CATEGORY` VALUE (NULL, "fiction");
INSERT INTO `CATEGORY` VALUE (NULL, "novel");
INSERT INTO `CATEGORY` VALUE (NULL, "travel");
INSERT INTO `CATEGORY` VALUE (NULL, "guide");
INSERT INTO `CATEGORY` VALUE (NULL, "horror");
INSERT INTO `CATEGORY` VALUE (NULL, "romance");
INSERT INTO `CATEGORY` VALUE (NULL, "science");
INSERT INTO `CATEGORY` VALUE (NULL, "others");

INSERT INTO `POST` VALUE (NULL, "GMAT", "author1", "./images/gmat.jpeg","review1",'2013-08-05 18:19:03', 2, 556);
INSERT INTO `POST` VALUE (NULL, "Clean Code", "author1", "./images/gmat.jpeg","review1",'2013-08-05 18:19:03', 1, 152);
INSERT INTO `POST` VALUE (NULL, "CSS and HTML", "author1", "./images/gmat.jpeg","review1",'2013-08-05 18:19:03', 2, 126);
INSERT INTO `POST` VALUE (NULL, "Book Marketing", "author1", "./images/gmat.jpeg","review1",'2013-08-05 18:19:03', 1, 98);
INSERT INTO `POST` VALUE (NULL, "JavaScript", "author1", "./images/gmat.jpeg","review1",'2013-08-05 18:19:03', 1, 69);
INSERT INTO `POST` VALUE (NULL, "JavaScript", "author1", "./images/gmat.jpeg","review1",'2013-08-05 18:19:03', 1, 999);
INSERT INTO `POST` VALUE (NULL, "JavaScript", "author1", "./images/gmat.jpeg","review1",'2013-08-05 18:19:03', 1, 125);

INSERT INTO JOIN_POST_CATEGORY VALUE (1, 1);
INSERT INTO JOIN_POST_CATEGORY VALUE (4, 2);
INSERT INTO JOIN_POST_CATEGORY VALUE (5, 2);
INSERT INTO JOIN_POST_CATEGORY VALUE (1, 2);
INSERT INTO JOIN_POST_CATEGORY VALUE (3, 3);
INSERT INTO JOIN_POST_CATEGORY VALUE (2, 3);
INSERT INTO JOIN_POST_CATEGORY VALUE (1, 5);
INSERT INTO JOIN_POST_CATEGORY VALUE (1, 6);




