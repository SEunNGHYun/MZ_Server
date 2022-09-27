CREATE TABLE USERS_TB
(
  user_id            VARCHAR(50)     NOT NULL PRIMARY KEY UNIQUE,
  user_password      TEXT            NOT NULL,
  user_age           INT             NOT NULL,
  user_state         VARCHAR(20)     NOT NULL,
  user_city          VARCHAR(30)             ,
  refresh_token      TEXT            NULL,
  user_createdAt     TIMESTAMP       ON_UPDATE CURRENT_TIMESTAMP   
)

CREATE TABLE INTERESTES_TB
(
  interest_id         INT             PRIMARY KEY UNIQUE AUTO_INCREMENT,
  interest_code       VARCHAR(10)     NOT NULL,
  interest_img        TEXT            NULL,
  interest_field      VARCHAR(10)     NOT NULL
)

CREATE TABLE INTERESTES_USERS_TB
(
  interest_ids        INT                 NOT NULL,
  user_ids            VARCHAR(50)         NOT NULL,
  FOREIGN KEY (interest_ids) REFERENCES INTERESTES_TB(interest_id)
    ON DELETE CASCADE,
  FOREIGN KEY (user_ids) REFERENCES USERS_TB(user_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
)


CREATE TABLE SCRAB_POLICIES
(
  user_id             VARCHAR(50)          NOT NULL,
  policy_id           TEXT                 NOT NULL,
  FOREIGN KEY (user_id) REFERENCES USERS_TB(user_id)
  ON DELETE CASCADE 
  ON UPDATE CASCADE
)

SET TIME ZONE 'Asia/Seoul';