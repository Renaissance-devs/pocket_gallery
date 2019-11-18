DROP TABLE IF EXISTS works;

CREATE TABLE works (
  id SERIAL PRIMARY KEY,
  artist VARCHAR(255),
  title VARCHAR(255),
  image_url VARCHAR(255),
  century VARCHAR(255),
  gallery VARCHAR(255)
);
