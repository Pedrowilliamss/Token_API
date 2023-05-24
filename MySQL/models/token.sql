-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema token
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `token` ;

-- -----------------------------------------------------
-- Schema token
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `token` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `token` ;

-- -----------------------------------------------------
-- Table `token`.`prioridade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `token`.`prioridade` ;

CREATE TABLE IF NOT EXISTS `token`.`prioridade` (
  `id_prioridade` INT NOT NULL AUTO_INCREMENT,
  `prioridade` VARCHAR(2) NOT NULL,
  `tempo_medio` INT NOT NULL,
  PRIMARY KEY (`id_prioridade`),
  UNIQUE INDEX `prioridade_UNIQUE` (`prioridade` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `token`.`quantidade_senha`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `token`.`quantidade_senha` ;

CREATE TABLE IF NOT EXISTS `token`.`quantidade_senha` (
  `id_quantidade_senhas` INT NOT NULL AUTO_INCREMENT,
  `id_prioridade` INT NOT NULL,
  `quantidade_atual` MEDIUMINT(8) NOT NULL,
  `quantidade_total` BIGINT(8) NOT NULL,
  `quantidade_atendida` BIGINT(8) NOT NULL,
  PRIMARY KEY (`id_quantidade_senhas`, `id_prioridade`),
  INDEX `fk_quantidade_senha_prioridade1_idx` (`id_prioridade` ASC) VISIBLE,
  CONSTRAINT `fk_quantidade_senha_prioridade1`
    FOREIGN KEY (`id_prioridade`)
    REFERENCES `token`.`prioridade` (`id_prioridade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `token`.`senha`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `token`.`senha` ;

CREATE TABLE IF NOT EXISTS `token`.`senha` (
  `id_senha` INT NOT NULL AUTO_INCREMENT,
  `idquantidade_senhas` INT NOT NULL,
  `id_prioridade` INT NOT NULL,
  `senha` VARCHAR(11) NOT NULL,
  `ativa` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_senha`, `idquantidade_senhas`, `id_prioridade`),
  INDEX `fk_senhas_quantidade_senhas1_idx` (`idquantidade_senhas` ASC) VISIBLE,
  INDEX `fk_senha_prioridade1_idx` (`id_prioridade` ASC) VISIBLE,
  CONSTRAINT `fk_senhas_quantidade_senhas1`
    FOREIGN KEY (`idquantidade_senhas`)
    REFERENCES `token`.`quantidade_senha` (`id_quantidade_senhas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_senha_prioridade1`
    FOREIGN KEY (`id_prioridade`)
    REFERENCES `token`.`prioridade` (`id_prioridade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `token`.`guiche`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `token`.`guiche` ;

CREATE TABLE IF NOT EXISTS `token`.`guiche` (
  `id_guiche` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`id_guiche`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `token`.`atendimento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `token`.`atendimento` ;

CREATE TABLE IF NOT EXISTS `token`.`atendimento` (
  `id_atendimento` INT NOT NULL AUTO_INCREMENT,
  `id_senha` INT NOT NULL,
  `guiche_id_guiche` INT UNSIGNED NOT NULL,
  `temp_atendimento_inicio` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  `temp_atendimento_fim` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_atendimento`),
  INDEX `id_senha` (`id_senha` ASC) VISIBLE,
  INDEX `fk_atendimento_guiche1_idx` (`guiche_id_guiche` ASC) VISIBLE,
  CONSTRAINT `atendimentos_ibfk_2`
    FOREIGN KEY (`id_senha`)
    REFERENCES `token`.`senha` (`id_senha`),
  CONSTRAINT `fk_atendimento_guiche1`
    FOREIGN KEY (`guiche_id_guiche`)
    REFERENCES `token`.`guiche` (`id_guiche`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `token`.`prioridade`
-- -----------------------------------------------------
START TRANSACTION;
USE `token`;
INSERT INTO `token`.`prioridade` (`id_prioridade`, `prioridade`, `tempo_medio`) VALUES (1, 'SP', 15);
INSERT INTO `token`.`prioridade` (`id_prioridade`, `prioridade`, `tempo_medio`) VALUES (2, 'SG', 5);
INSERT INTO `token`.`prioridade` (`id_prioridade`, `prioridade`, `tempo_medio`) VALUES (3, 'SE', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `token`.`quantidade_senha`
-- -----------------------------------------------------
START TRANSACTION;
USE `token`;
INSERT INTO `token`.`quantidade_senha` (`id_quantidade_senhas`, `id_prioridade`, `quantidade_atual`, `quantidade_total`, `quantidade_atendida`) VALUES (1, 1, 0, 0, 0);
INSERT INTO `token`.`quantidade_senha` (`id_quantidade_senhas`, `id_prioridade`, `quantidade_atual`, `quantidade_total`, `quantidade_atendida`) VALUES (2, 2, 0, 0, 0);
INSERT INTO `token`.`quantidade_senha` (`id_quantidade_senhas`, `id_prioridade`, `quantidade_atual`, `quantidade_total`, `quantidade_atendida`) VALUES (3, 3, 0, 0, 0);

COMMIT;


-- -----------------------------------------------------
-- Data for table `token`.`guiche`
-- -----------------------------------------------------
START TRANSACTION;
USE `token`;
INSERT INTO `token`.`guiche` (`id_guiche`, `descricao`) VALUES (1, 'Guiche 1');
INSERT INTO `token`.`guiche` (`id_guiche`, `descricao`) VALUES (2, 'Guiche 2');
INSERT INTO `token`.`guiche` (`id_guiche`, `descricao`) VALUES (3, 'Guiche 3');

COMMIT;

