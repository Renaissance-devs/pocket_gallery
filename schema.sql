DROP TABLE IF EXISTS works;
DROP TABLE IF EXISTS gallery;

CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)  
);

CREATE TABLE works (
  id SERIAL PRIMARY KEY,
  artist VARCHAR(255),
  title VARCHAR(255),
  image_url VARCHAR(255),
  century VARCHAR(255),
  gallery_id INT,
  CONSTRAINT fk_gallery FOREIGN KEY (gallery_id)  REFERENCES gallery(id) ON DELETE CASCADE
);

INSERT INTO gallery (name) VALUES ('landscapes');
INSERT INTO gallery (name) VALUES ('portraits');
INSERT INTO gallery (name) VALUES ('mountains');
INSERT INTO gallery (name) VALUES ('life');
INSERT INTO gallery (name) VALUES ('skull');
INSERT INTO gallery (name) VALUES ('religious');
INSERT INTO gallery (name) VALUES ('instructors');


INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Eugene Speicher', 'Landscape', 'https://nrs.harvard.edu/urn-3:HUAM:LEG259441', '19th-20th century', 1);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Joseph Lindon Smith', 'Mountain Landscape', 'https://nrs.harvard.edu/urn-3:HUAM:INV006558_dynmc', '19th-20th century', 3);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Joshua Johnson', 'Portrait of a Girl', 'https://nrs.harvard.edu/urn-3:HUAM:DDC104098_dynmc', '19th century', 2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Jakob Ochtervelt', 'Portrait of a Family', 'https://nrs.harvard.edu/urn-3:HUAM:30011_dynmc', '17th century', 4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Karl von Blaas', 'The Miraculous Translation of the Body of Saint Catherine of Alexandria to Sinai', 'https://nrs.harvard.edu/urn-3:HUAM:46448_dynmc', '19th century', 6);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Mary Cassatt', 'Woman on a Striped Sofa with a Dog', 'https://nrs.harvard.edu/urn-3:HUAM:DDC252719_dynmc', '19th century', 4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Alexander Pope', 'Skull', 'https://nrs.harvard.edu/urn-3:HUAM:770200', '19th-20th century', 5);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Calvin Cheng', 'Bringer of "The Pain"', '/assets/calvin.jpg', '21st century', 7);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Nathaniel Pierce', 'Sudo Hot Sauce', '/assets/nate.jpg', '21st century', 7);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Douglas Taylor', 'Bug Hunter', '/assets/doug.jpg', '21st century', 7);