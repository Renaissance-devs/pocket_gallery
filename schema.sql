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
INSERT INTO gallery (name) VALUES ('skulls');
INSERT INTO gallery (name) VALUES ('religious');
INSERT INTO gallery (name) VALUES ('abstract');
INSERT INTO gallery (name) VALUES ('animals');
INSERT INTO gallery (name) VALUES ('fantasy');
INSERT INTO gallery (name) VALUES ('botanical');
INSERT INTO gallery (name) VALUES ('fish');
INSERT INTO gallery (name) VALUES ('instructors');

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Eugene Speicher','Landscape','https://nrs.harvard.edu/urn-3:HUAM:LEG259441','19th-20th century',1);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Joshua Johnson','Portrait of a Girl','https://nrs.harvard.edu/urn-3:HUAM:DDC104098_dynmc','19th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Joseph Lindon Smith','Mountain Landscape','https://nrs.harvard.edu/urn-3:HUAM:INV006558_dynmc','19th-20th century',3);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Jakob Ochtervelt','Portrait of a Family','https://nrs.harvard.edu/urn-3:HUAM:30011_dynmc','17th century',4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Karl von Blaas','The Miraculous Translation of the Body of Saint Catherine of Alexandria to Sinai','https://nrs.harvard.edu/urn-3:HUAM:46448_dynmc','19th century',6);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Mary Cassatt','Woman on a Striped Sofa with a Dog','https://nrs.harvard.edu/urn-3:HUAM:DDC252719_dynmc','19th century',4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Alexander Pope','Skull','https://nrs.harvard.edu/urn-3:HUAM:770200','19th-20th century',5);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Unidentified Artist','View of the Colosseum, Rome','https://nrs.harvard.edu/urn-3:HUAM:VRS17188_dynmc','18th century',1);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Jacques-Louis David','Emperor Napoleon I (1769-1821)','https://nrs.harvard.edu/urn-3:HUAM:51180_dynmc','19th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('John Greenwood','Henry Gibbs (1709-1759)','https://nrs.harvard.edu/urn-3:huam:DDC113750_dynmc','18th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Unidentified Artist','John Winthrop (1588-1649)','https://nrs.harvard.edu/urn-3:HUAM:DDC108564_dynmc','17th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('John Johnston','John McLean (1761-1823)','https://nrs.harvard.edu/urn-3:huam:DDC113654_dynmc','19th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Francis Alexander','Mary Crowninshield Silsbee Sparks (Mrs. Jared  Sparks) (1809-1887)','https://nrs.harvard.edu/urn-3:HUAM:756521','19th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Gilbert Stuart','George Washington (1732-1799)','https://nrs.harvard.edu/urn-3:huam:DDC112111_dynmc','18th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Helen Bigelow Merriman','Sarah Wyman Whitman (1842-1904)','https://nrs.harvard.edu/urn-3:HUAM:74530_dynmc','20th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('artist unavailable','Cantonese Painting of a Fish Identified as "Kum-Koo," Icatophagus [sic] New Species','https://nrs.harvard.edu/urn-3:HUAM:CARP10594_dynmc','20th century',11);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Thomas Couture','Romans of the Decadence','https://nrs.harvard.edu/urn-3:HUAM:DDC231389_dynmc','19th century',4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Abbott Handerson Thayer','Angel','https://nrs.harvard.edu/urn-3:HUAM:61455_dynmc','20th century',6);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Guariento di Arpo','Armed Angel (Principatus)','https://nrs.harvard.edu/urn-3:HUAM:DDC254051_dynmc','14th century',6);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Unidentified Artist','Joseph Dudley (1647-1720), after an English artist','https://nrs.harvard.edu/urn-3:HUAM:DDC110794_dynmc','18th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Unidentified Artist','Abraham Lincoln (1809-1865)','https://nrs.harvard.edu/urn-3:HUAM:VRS64628_dynmc','19th-20th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('D.R. Grover','Composition','https://nrs.harvard.edu/urn-3:HUAM:INV160511_dynmc','20th century',7);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Joseph Rodefer DeCamp','Theodore Roosevelt (1858-1919)','https://nrs.harvard.edu/urn-3:HUAM:21060_dynmc','20th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Takada Keiho','Mount Fuji, Miho Pine Forest, and Seikenji Temple','https://nrs.harvard.edu/urn-3:HUAM:768280','18th century',3);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('William Holman Hunt','The Miracle of the Sacred Fire, Church of the Holy Sepulchre','https://nrs.harvard.edu/urn-3:HUAM:51178_dynmc','19th century',6);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Thomas Satterwhite Noble','Skull Wearing a Wreath of Flowers','https://nrs.harvard.edu/urn-3:HUAM:770371','19th century',5);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('artist unavailable','Seated Buddha','https://nrs.harvard.edu/urn-3:HUAM:INV016065_dynmc','century unavailable',6);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Unknown Artist','Two Llamas','https://nrs.harvard.edu/urn-3:HUAM:ISL10102_dynmc','19th century',8);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Elihu Vedder','Fisherman and Mermaid','https://nrs.harvard.edu/urn-3:HUAM:73139_dynmc','19th century',9);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Hilaire-Germain-Edgar Degas','Ballet Dancer','https://nrs.harvard.edu/urn-3:HUAM:17696_dynmc','19th century',4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Sin Saimdang','Thistle, Frog, Snail, Butterfly, and Dragonfly','https://nrs.harvard.edu/urn-3:HUAM:78676_dynmc','17th century',10);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('William Stone','John James Audubon (1785-1851), after George Peter Alexander Healy','https://nrs.harvard.edu/urn-3:HUAM:DDC111712_dynmc','19th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Matthijs Maris','Young Girl with Butterflies','https://nrs.harvard.edu/urn-3:HUAM:764234','19th century',4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Worthington Whittredge','A Sheep Cote on Lake Albano','https://nrs.harvard.edu/urn-3:HUAM:71023_dynmc','19th century',1);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Johannes Adam Simon Oertel','Two Evangelists','https://nrs.harvard.edu/urn-3:HUAM:61340_dynmc','19th century',6);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('artist unavailable','Cantonese Painting of an Unidentified, Green and Black Fish with Multicolored Fins and Tail','https://nrs.harvard.edu/urn-3:HUAM:CARP10584_dynmc','20th century',11);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Nicolaes Maes','A Family Group','https://nrs.harvard.edu/urn-3:HUAM:759801','17th century',4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Aqa Riza (Riza ‘Abbasi)','Nashmi the Archer','https://nrs.harvard.edu/urn-3:HUAM:47936_dynmc','17th century',4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Unknown Artist','Kakubha Ragini, Lady with Three Peacocks, from a Ragamala Series (Garland of Musical Modes)','https://nrs.harvard.edu/urn-3:HUAM:ISL10058_dynmc','17th century',4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Kawasaki Shōko','Young Rabbit','https://nrs.harvard.edu/urn-3:HUAM:CARP07347_dynmc','20th century',8);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Kano Tsunenobu','Rabbit, Wave and Full Moon','https://nrs.harvard.edu/urn-3:HUAM:CARP14547_dynmc','17th century',8);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Charles Harold Davis','Clouds after Storm','https://nrs.harvard.edu/urn-3:HUAM:62125_dynmc','20th century',1);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Kano Yasunobu','Descending Dragon','https://nrs.harvard.edu/urn-3:HUAM:CARP14610_dynmc','17th century',9);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('artist unavailable','Rao Raja Bhoj Singh of Bundi Batters a Leaping Tiger from a Tree','https://nrs.harvard.edu/urn-3:HUAM:DDC111283_dynmc','17th century',4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Tani Bunchō','Mount Fuji','https://nrs.harvard.edu/urn-3:HUAM:LEG252231','19th century',3);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Unknown Artist','Girl Musician with a Dancing Peacock','https://nrs.harvard.edu/urn-3:HUAM:ISL10150_dynmc','19th century',4);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Gerard David','Joos van der Burch and Saint Simon of Jerusalem','https://nrs.harvard.edu/urn-3:HUAM:38403_dynmc','15th century',6);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Unknown Artist','The Infant Krishna Floating on the Cosmic Ocean, Folio from a Bhagavata Purana (History of God) series','https://nrs.harvard.edu/urn-3:HUAM:ISL10083_dynmc','19th century',6);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Johannes Adam Simon Oertel','Morning Call','https://nrs.harvard.edu/urn-3:HUAM:62129_dynmc','19th century',8);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Wan Qingli','Gazing at the Moon','https://nrs.harvard.edu/urn-3:HUAM:768749','20th century',1);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('William Beechey','Boy and a Dog','https://nrs.harvard.edu/urn-3:HUAM:VRS17387_dynmc','19th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('John La Farge','The Dawn','https://nrs.harvard.edu/urn-3:HUAM:51174_dynmc','19th-20th century',6);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Gustave Moreau','The Chimera','https://nrs.harvard.edu/urn-3:HUAM:51379_dynmc','19th century',9);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Liu Guosong (Liu Kuo-sung)','Moon on Snowy Mountains','https://nrs.harvard.edu/urn-3:HUAM:763874','20th century',3);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Vincent van Gogh','Self-Portrait Dedicated to Paul Gauguin','https://nrs.harvard.edu/urn-3:HUAM:DDC251942_dynmc','19th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('John Singleton Copley','Abigael Bromfield Rogers (Mrs. Daniel Denison Rogers) (1753-1791)','https://nrs.harvard.edu/urn-3:HUAM:49047_dynmc','18th century',2);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Joos van Cleve','Saint Jerome in His Study','https://nrs.harvard.edu/urn-3:HUAM:DDC231549_dynmc','16th century',5);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Calvin Cheng', 'Bringer of "The Pain"', 'https://github.com/Renaissance-devs/pocket_gallery/blob/master/public/assets/calvin.jpg?raw=true', '21st century', 12);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Nathaniel Pierce', 'Sudo Hot Sauce', 'https://github.com/Renaissance-devs/pocket_gallery/blob/master/public/assets/nate.jpg?raw=true', '21st century', 12);

INSERT INTO works (artist, title, image_url, century, gallery_id)
VALUES ('Douglas Taylor', 'Bug Hunter', 'https://github.com/Renaissance-devs/pocket_gallery/blob/master/public/assets/doug.jpg?raw=true', '21st century', 12);