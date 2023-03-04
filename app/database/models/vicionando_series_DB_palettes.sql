
use ruscicacode_vicionando_series_2; 

-- INSERTS from roles
INSERT INTO palettes (`name`, `description`, `filename`) VALUES
	('dark', 'A simple dark bassed color palette for the app', 'dark.css'),
	('light', 'A simple Light bassed color palette for the app', 'light.css');

-- SELECTS from photos
SELECT * FROM palettes;
SELECT * FROM palettes WHERE id = '1';

-- UPDATES from palettes
UPDATE palettes SET 
	`name` = 'edited_palette_name',
	`description` = 'edited palette description',
    `filename` = 'edited_css_filename.css'
 WHERE id = 1;

-- DELETEs
DELETE FROM palettes WHERE id = '1';
DROP TABLE palettes;



