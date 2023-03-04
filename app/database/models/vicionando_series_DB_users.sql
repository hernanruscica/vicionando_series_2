
use ruscicacode_vicionando_series_2; 

-- INSERTS FROM USERS - rol 0 = editor rol 1 = admin
INSERT INTO users (`name`, `email`, `password`, `roles_id`, `photos_id`, `real_name`,  `birthday`, `palettes_id`) VALUES 
    ('juanca1234', 'juancarlosfurro@gmail.com', password('1234'), 1, 1, 'Juan Carlos Lopez', '2008-11-11', 1),
    ('pepe', 'pepelocura@hotmail.com', password('6589'), 1, 1, 'Jose Carlos Luciani', '2018-10-01', 1),
    ('elvio44', 'elviohermetica@gmail.com', password('7843'), 1, 1, 'Elvio Lento', '2000-01-02', 1),
    ('usuarioBorrable', 'soy_borreable@gmail.com', password('2234'), 1, 1, 'Juan BO rrable', '2000-01-12', 1);
    
-- SELECTS FROM USERS
SELECT * FROM users;
SELECT * FROM users WHERE id = '1';
SELECT * FROM users WHERE name = 'pepe';
SELECT * FROM users WHERE email = 'pepelocura@hotmail.com';

-- UPDATES FROM USERS
UPDATE users
SET `name` = 'edited_name',
	`email` = 'edited@email.com',
    `password` = 'edited_password',
    `roles_id` = 0,
    `photos_id` = 2,
    `real_name`= 'edited real name',  
    `birthday` = '2008-11-11', 
    `palette_id` = 0
WHERE id = 1;

UPDATE users SET `password` = 'edited_password' WHERE id = 1;

UPDATE users SET `palette_id` = 1 WHERE id = 1;

-- DELETEs FROM USERS
DELETE FROM users WHERE id = '7';
DROP TABLE users;  