
use ruscicacode_vicionando_series_2; 

-- INFO FROM THE API: name, description, episodes_quantity, `seasons_quantity` 
INSERT INTO vicionados (`name`, `description`, `date_added`, `episode_current`, `episodes_quantity`, `seasons_quantity`, `api_provider`, `api_id`, `video_provider_1`, `video_provider_2`, `video_provider_3`, `users_id`) VALUES
	('Dragon Ball 1temp', 'Primera temporada de Dragon Ball de Akira Toriyama', '2023-02-27', 1, 153, 4, 'tvmaze', '2102', 'https://mega.sdfsdf', 'https://mega.sdfsdf', 'https://mega.sdfsdf', 1),
    ('Sailor Moon primer tempo', 'Primera temporada de Sailor Moon', '2023-02-28', 1, 200, 3, 'tvmaze', '5476', 'https://mega.sdfsdf', 'https://mega.sdfsdf', 'https://mega.sdfsdf', 2),
    ('Spy X Family', 'Primera temporada de SpyXFamily', '2023-03-01', 1, 25, 1, 'tvmaze', '59698', 'https://mega.sdfsdf', 'https://mega.sdfsdf', 'https://mega.sdfsdf', 2);
    
-- GET all the 'vicionados' from one user, with the id
SELECT * FROM vicionados WHERE `users_id` = '2';
SELECT * FROM vicionados WHERE (`name` LIKE 'spy' AND `users_id` = '2');