CREATE TABLE USERS_TB
(
  user_id            VARCHAR(50)     NOT NULL PRIMARY KEY UNIQUE,
  user_password      TEXT            NOT NULL,
  user_age           INT             NOT NULL,
  user_state         VARCHAR(20)     NOT NULL,
  user_city          VARCHAR(30)             ,
  refresh_token      TEXT            NULL    ,
  user_createdAt     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE INTERESTES_TB
(
  interest_id         INT             NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
  interest_code       VARCHAR(10)     NOT NULL,
  interest_img        TEXT            NULL,
  interest_field      VARCHAR(10)     NOT NULL
);

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
  policy_id               VARCHAR(20)  NOT NULL PRIMARY KEY UNIQUE,
  policy_name             TEXT         NOT NULL,
  policy_introduce        TEXT         NOT NULL,
  policy_scale            VARCHAR(50)  NOT NULL,
  policy_date             TEXT         NOT NULL,
  policy_enable_age       VARCHAR(50)  NOT NULL,
  policy_enable_status    VARCHAR(50)  NOT NULL,
  policy_enable_edu       VARCHAR(50)  NOT NULL,
  policy_enable_majr      VARCHAR(50)  NOT NULL,
  policy_enable_spil      VARCHAR(50)  NOT NULL,
  policy_sub_way          TEXT         NOT NULL,
  policy_sub_place        VARCHAR(50)  NOT NULL,
  policy_result_date      VARCHAR(50)  NOT NULL,
  policy_support          VARCHAR(50)  NOT NULL
)


CREATE TABLE SCRAB_POLICIES_USERS
(
  user_ids             VARCHAR(50)          NOT NULL,
  policy_ids           VARCHAR(20)          NOT NULL,
  FOREIGN KEY (user_ids) REFERENCES USERS_TB(user_id)
  ON DELETE CASCADE 
  ON UPDATE CASCADE,
  FOREIGN KEY (policy_ids) REFERENCES SCRAB_POLICIES(policy_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
)

SET TIME ZONE 'Asia/Seoul';