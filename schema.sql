DROP TABLE IF EXISTS works;

CREATE TABLE works (
  id SERIAL PRIMARY KEY,
  artist VARCHAR(255),
  title VARCHAR(255),
  image_url VARCHAR(255),
  century VARCHAR(255),
  gallery VARCHAR(255)
);

INSERT INTO works (artist, title, image_url, century, gallery)
VALUES ('Eugene Speicher', 'Landscape', 'https://nrs.harvard.edu/urn-3:HUAM:LEG259441', '19th-20th century', 'landscapes');

INSERT INTO works (artist, title, image_url, century, gallery)
VALUES ('Joseph Lindon Smith', 'Mountain Landscape', 'https://nrs.harvard.edu/urn-3:HUAM:INV006558_dynmc', '19th-20th century', 'mountains');

INSERT INTO works (artist, title, image_url, century, gallery)
VALUES ('Joshua Johnson', 'Portrait of a Girl', 'https://nrs.harvard.edu/urn-3:HUAM:DDC104098_dynmc', '19th century', 'portraits');

INSERT INTO works (artist, title, image_url, century, gallery)
VALUES ('Jakob Ochtervelt', 'Portrait of a Family', 'https://nrs.harvard.edu/urn-3:HUAM:30011_dynmc', '17th century', 'life');

INSERT INTO works (artist, title, image_url, century, gallery)
VALUES ('Karl von Blaas', 'The Miraculous Translation of the Body of Saint Catherine of Alexandria to Sinai', 'https://nrs.harvard.edu/urn-3:HUAM:46448_dynmc', '19th century', 'religious');

INSERT INTO works (artist, title, image_url, century, gallery)
VALUES ('Mary Cassatt', 'Woman on a Striped Sofa with a Dog', 'https://nrs.harvard.edu/urn-3:HUAM:DDC252719_dynmc', '19th century', 'life');

INSERT INTO works (artist, title, image_url, century, gallery)
VALUES ('Alexander Pope', 'Skull', 'https://nrs.harvard.edu/urn-3:HUAM:770200', '19th-20th century century', 'skull');