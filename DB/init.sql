DROP DATABASE IF EXISTS book_review;

CREATE DATABASE book_review;

USE book_review;

CREATE TABLE `USER` (UID BIGINT NOT NULL AUTO_INCREMENT, EMAIL VARCHAR(255), USERNAME VARCHAR(255), PASS VARCHAR(255), PRIMARY KEY (UID));

CREATE TABLE `COMMENT` (COMMENTID BIGINT NOT NULL AUTO_INCREMENT, CONTENT VARCHAR(255), 
`TIMESTAMP` DATETIME, USER_UID BIGINT, POST_POSTID BIGINT, PRIMARY KEY (COMMENTID));

CREATE TABLE `POST` (POSTID BIGINT NOT NULL AUTO_INCREMENT, BOOK_TITLE VARCHAR(255), BOOK_AUTHOR VARCHAR(255), PATH VARCHAR(255), REVIEW VARCHAR(255),
`TIMESTAMP` DATETIME, USER_UID BIGINT, PRIMARY KEY (POSTID));

CREATE TABLE `CATEGORY` (CATEGORYID BIGINT NOT NULL AUTO_INCREMENT, CATEGORY VARCHAR(255), PRIMARY KEY (CATEGORYID));

CREATE TABLE `RATE`(RATEID BIGINT NOT NULL AUTO_INCREMENT, RATING INT, USER_UID BIGINT, POST_POSTID BIGINT, 
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

INSERT INTO `USER` VALUE (NULL, "huy@gmailcom","HuyTrinh", "123456");
INSERT INTO `USER` VALUE (NULL, "tuan@gmailcom","TuanLe", "123456");
INSERT INTO `USER` VALUE (NULL, "user1@gmailcom","user1", "123456");
INSERT INTO `USER` VALUE (NULL, "user2@gmailcom","user2", "123456");
INSERT INTO `USER` VALUE (NULL, "user3@gmailcom","user3", "123456");
INSERT INTO `USER` VALUE (NULL, "user4@gmailcom","user4", "123456");