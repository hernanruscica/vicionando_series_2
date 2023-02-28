use ruscicacode_agendacac_db;


INSERT INTO photos (`filename`, `description`, `filesize`) VALUES
	('PHOTO20230211172453.jpg', 'Mi foto de perfíl', 1024);


-- rol 0 = editor rol 1 = admin
INSERT INTO users (`name`, `email`, `password`, `rol`, `photos_id`, `real_name`,  `birthday`, `palette`) VALUES 
    ('juanca1234', 'juancarlosfurro@gmail.com', password('1234'), 0, 1, 'Juan Carlos Lopez', '2008-11-11', 0),
    ('pepe', 'pepelocura@hotmail.com', password('6589'), 0, 1, 'Jose Carlos Luciani', '2018-10-01', 0),
    ('elvio44', 'elviohermetica@gmail.com', password('7843'), 0, 1, 'Elvio Lento', '2000-01-02', 0);
    
-- INFO FROM THE API: name, description, episodes_quantity, `seasons_quantity` 
INSERT INTO vicionados (`name`, `description`, `date_added`, `episode_current`, `episodes_quantity`, `seasons_quantity`, `api_provider`, `api_id`, `video_provider_1`, `video_provider_2`, `video_provider_3`) VALUES
	('Dragon Ball 1temp', 'Primera temporada de Dragon Ball de Akira Toriyama', '2023-02-27', 1, 153, 1, 'tvmaze', '2541', 'https://mega.sdfsdf', 'https://mega.sdfsdf', 'https://mega.sdfsdf')