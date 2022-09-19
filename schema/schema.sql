CREATE TABLE User 
(
  user_ID            VARCHAR(30)     NOT NULL,
  user_password      VARCHAR         NOT NULL,
  user_age           INT             NOT NULL,
  user_state         VARCHAR(20)     NOT NULL,
  user_city          VARCHAR(30)             ,
  user_createdAt     DATE                    ,
  PRIMARY KEY(user_ID)
)

CREATE TABLE Interest 
(
  Interest_ID         INT             NOT NULL,
  Interest_img        VARCHAR         NULL,
  Interest_field      VARCHAR(10)     NOT NULL,
  PRIMARY KEY(Interest_ID)
)

CREATE TABLE Interest_User
(
  Interest_ids        INT             NOT NULL,
  user_ids            INT             NOT NULL,
  FOREIGN KEY(Interest_ids) REFERENCES User (user_ID)
    ON DELETE CASCADE,
  FOREIGN KEY(user_ids) REFERENCES Interest (Interest_ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

CREATE TABLE Scrab_Policy 
(
  user_id   INT             NOT NULL,
  policy_id VARCHAR         NOT NULL,
  FOREIGN KEY(user_id)  REFERENCES User (user_ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)