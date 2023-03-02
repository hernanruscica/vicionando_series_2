
use ruscicacode_vicionando_series_2; 

-- INSERTS from photos
INSERT INTO photos (`filename`, `description`, `filesize`) VALUES
	('PHOTO20230211172453.jpg', 'Mi foto de perfíl', 1024),
	('PHOTO20230301172453.jpg', 'otra foto de perfíl', 1745);

-- SELECTS from photos
SELECT * FROM photos;
SELECT * FROM photos WHERE id = '1';

-- DELETEs
DELETE FROM photos WHERE id = '2';
DROP TABLE photos;



