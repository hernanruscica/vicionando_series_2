CREATE SCHEMA IF NOT EXISTS `ruscicacode_vicionando_series_2` DEFAULT CHARACTER SET utf8 ;
use ruscicacode_vicionando_series_2; 

-- -----------------------------------------------------
-- Table `photos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS photos (
  `id` INT NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(100) NOT NULL,
  `description` VARCHAR(100) NULL,
  `filesize` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `palettes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS palettes (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(100) NOT NULL,  
  `filename` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `roles_id` INT NOT NULL,
  `real_name` VARCHAR(100) NULL,
  `birthday` DATE NULL,
  `palettes_id` INT NULL,
  `photos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_users_photos_idx` (`photos_id` ASC) ,
  INDEX `fk_users_palettes_idx` (`palettes_id` ASC) ,
  INDEX `fk_users_roles_idx` (`roles_id` ASC) ,
  CONSTRAINT `fk_users_photos`
    FOREIGN KEY (`photos_id`)
    REFERENCES ruscicacode_vicionando_series_2.photos (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_palettes`
    FOREIGN KEY (`palettes_id`)
    REFERENCES ruscicacode_vicionando_series_2.palettes (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_roles`
    FOREIGN KEY (`roles_id`)
    REFERENCES ruscicacode_vicionando_series_2.roles (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)  
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `vicionados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS vicionados (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NULL,
  `date_added` DATE NOT NULL,
  `episode_current` VARCHAR(45) NOT NULL,
  `episodes_quantity` INT NOT NULL,
  `seasons_quantity` INT NOT NULL,
  `api_provider` VARCHAR(100) NULL,
  `api_id` VARCHAR(255) NULL,
  `video_provider_1` VARCHAR(255) NULL,
  `video_provider_2` VARCHAR(255) NULL,
  `video_provider_3` VARCHAR(255) NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_vicionados_users1_idx` (`users_id` ASC) ,
  CONSTRAINT `fk_vicionados_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES ruscicacode_vicionando_series_2.users (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
