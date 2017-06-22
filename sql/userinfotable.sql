DROP TABLE IF EXISTS userinfo;

CREATE TABLE userinfo (
  user_id SERIAL PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(30) UNIQUE NOT NULL,
  hashedPass VARCHAR(99) UNIQUE NOT NULL
);
