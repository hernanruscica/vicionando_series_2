
use ruscicacode_vicionando_series_2; 

-- INSERTS from roles
INSERT INTO roles (`name`, `description`) VALUES
	('user', 'A simple user of the app. Access limited to its own user'),
	('admin', 'Admin account for administration access, could manage information of all the users');

-- SELECTS from photos
SELECT * FROM roles;
-- SELECT * FROM roles WHERE id = '1';

-- UPDATES from roles
UPDATE roles SET 
	`name` = 'edited_role_name',
	`description` = 'edited role description'    
 WHERE id = 1;

-- DELETEs
DELETE FROM roles WHERE id = '1';
DROP TABLE roles;



