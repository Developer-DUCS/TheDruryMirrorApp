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
  `email` VARCHAR(60) NOT NULL,
  `password` VARCHAR(60) NULL,
  `roles` VARCHAR(20) NOT NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`uid`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thomas`.`article`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `drurymirror`.`articles` ;

CREATE TABLE IF NOT EXISTS `drurymirror`.`articles` (
  `pid` INT NOT NULL AUTO_INCREMENT,
  `author` VARCHAR(45) NOT NULL,
  `headline` VARCHAR(50) NOT NULL,
  `body` VARCHAR(8000) NOT NULL,
  `isDraft` bool NOT NULL,
  `createdDate` date NOT NULL,
  PRIMARY KEY (`pid`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `thomas`.`unfinished`
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
-- Table `thomas`.`article`
-- -----------------------------------------------------

-- DROP TABLE IF EXISTS `drurymirror`.`comments` ;

-- Need to discuss what the this table will have and how the ID's work

-- CREATE TABLE IF NOT EXISTS `thomas`.`comments`


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;