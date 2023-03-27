-- -----------------------------------------------------
-- Sql file to reset database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema drury_mirror_portal
-- -----------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


CREATE SCHEMA IF NOT EXISTS `drurymirror` DEFAULT CHARACTER SET utf8 ;
USE `drurymirror` ;

-- -----------------------------------------------------
-- Table `drurymirror`.`user`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `drurymirror`.`users` (
  `uid` INT NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(45) NOT NULL,
  `lname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `password` VARCHAR(60) NULL,
  `roles` VARCHAR(20) NOT NULL,
  `created` DATETIME NULL,
  'thumbnailImage' LONGBLOB NULL,
  `active` bool NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `drurymirror`.`comments`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `drurymirror`.`comments` ;

CREATE TABLE IF NOT EXISTS `drurymirror`.`comments` (
  `cid` INT NOT NULL, -- Set to the same as the "aid" of the article that the comments belong to
  `email` VARCHAR(60) NOT NULL,
  `editor` VARCHAR(45) NOT NULL,
  `overallComments` VARCHAR(500) NOT NULL,
  `comments` VARCHAR(500) NOT NULL,
  `createdDate` date NOT NULL,
  PRIMARY KEY (`cid`))
ENGINE = InnoDB;
 
-- -----------------------------------------------------
-- Table `drurymirror`.`article`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `drurymirror`.`articles` ;

-- isDraft: 0: Unfinished, 1: Draft (ready to be edited), 2: Edited (sent back to the author), 
--          3: Fixed (sent to editor again), 4: Ready to publish (send to Editor-In-Chief), 5: Publish
CREATE TABLE IF NOT EXISTS `drurymirror`.`articles` (
  `aid` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(60) NOT NULL,
  `author` VARCHAR(45) NOT NULL,
  `headline` VARCHAR(50) NOT NULL,
  `body` MEDIUMTEXT NOT NULL,
  `isDraft` INT NOT NULL,
  `createdDate` date NOT NULL,
  PRIMARY KEY (`aid`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `drurymirror`.`tags`
-- -----------------------------------------------------
  DROP TABLE IF EXISTS `drurymirror`.`tags` ;

  CREATE TABLE IF NOT EXISTS `drurymirror`.`tags` (
    `tid` INT NOT NULL,
    `local` bool,
    `national` bool,
    `international` bool,
    PRIMARY KEY (`tid`))
  ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `drurymirror`.`unfinished`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `drurymirror`.`unfinished` ;

CREATE TABLE IF NOT EXISTS `drurymirror`.`unfinished` (
  `fid` INT NOT NULL AUTO_INCREMENT,
  `author` VARCHAR(45) NOT NULL,
  `headline` VARCHAR(50) NOT NULL,
  `body` VARCHAR(8000) NOT NULL,
  `isDraft` bool NOT NULL,
  `createdDate` date NOT NULL,
  PRIMARY KEY (`fid`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `drurymirror`.`sessions`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `drurymirror.sessions`;

CREATE TABLE IF NOT EXISTS `drurymirror.sessions`
  (
    `id`            INT NOT NULL AUTO_INCREMENT,
    `user_id`       INTEGER NOT NULL,
    `expires`       TIMESTAMP(6) NOT NULL,
    `session_token` VARCHAR(255) NOT NULL,
    `access_token`  VARCHAR(255) NOT NULL,
    `created_at`    TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at`    TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`id`)
  )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `drurymirror`.`tokens`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `drurymirror.tokens`;

-- forgot_password_token row is a placeholder for the tokens used to reset passwords
-- when a new password is made the token will be stored and overwritten when another
-- new password is made.
CREATE TABLE IF NOT EXISTS `drurymirror.tokens`
  (
    `id`                            INT NOT NULL AUTO_INCREMENT,
    `email`                         INTEGER NOT NULL,
    `forgot_password_token`         VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
  )
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;