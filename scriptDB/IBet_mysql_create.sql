CREATE DATABASE IF NOT EXISTS ibetDB;

CREATE TABLE `Pessoa` (
	`idPessoa` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`telefone` varchar(11) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`dataNascimento` DATE NOT NULL,
	`username` varchar(50) NOT NULL UNIQUE,
	`senha` varchar(16) NOT NULL,
	`cpf` varchar(11) NOT NULL UNIQUE,
	PRIMARY KEY (`idPessoa`)
);

CREATE TABLE `Endereco` (
	`idEndereco` INT NOT NULL AUTO_INCREMENT,
	`idPessoa` INT NOT NULL,
	`codigoPostal` varchar(8) NOT NULL,
	`logradouro` varchar(255) NOT NULL,
	`numero` varchar(10) NOT NULL,
	`complemento` varchar(255),
	`bairro` varchar(255) NOT NULL,
	`cidade` varchar(255) NOT NULL,
	`estado` varchar(255) NOT NULL,
	`pais` varchar(255) NOT NULL,
	PRIMARY KEY (`idEndereco`)
);

CREATE TABLE `Funcionario` (
	`idFuncionario` INT NOT NULL AUTO_INCREMENT,
	`idPessoa` INT NOT NULL,
	PRIMARY KEY (`idFuncionario`, `idPessoa`)
);

CREATE TABLE `Administrador` (
	`idAdministrador` INT NOT NULL AUTO_INCREMENT,
	`idPessoa` INT NOT NULL,
	PRIMARY KEY (`idAdministrador`, `idPessoa`)
);


CREATE TABLE `Partida` (
	`idPartida` INT NOT NULL AUTO_INCREMENT,
	`idTimeA` INT NOT NULL,
	`idTimeB` INT NOT NULL,
	`dataHoraInicio` DATETIME NOT NULL,
	`status` varchar(255) NOT NULL DEFAULT '1, 2, 3, 4',
	`descricaoStatus` TEXT NOT NULL,
	PRIMARY KEY (`idPartida`)
);

CREATE TABLE `Time` (
	`idTime` INT NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`pais` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`idTime`)
);

CREATE TABLE `Apostador` (
	`idApostador` INT NOT NULL AUTO_INCREMENT,
	`idPessoa` INT NOT NULL,
	`saldo` DECIMAL(10,2) NOT NULL,
	PRIMARY KEY (`idApostador`, `idPessoa`)
);

CREATE TABLE `Aposta` (
	`idAposta` INT NOT NULL AUTO_INCREMENT,
	`idUsuario` INT NOT NULL,
	`idPartida` INT NOT NULL,
	`valor` DECIMAL(10,2) NOT NULL,
	`dataHora` DATETIME NOT NULL,
	`opcao` TEXT NOT NULL,
	`pontosTimeA` INT NOT NULL,
	`pontosTimeB` INT NOT NULL,
	PRIMARY KEY (`idAposta`)
);

CREATE TABLE `ContaBancaria` (
	`idContaBancaria` INT NOT NULL AUTO_INCREMENT,
	`idApostador` INT NOT NULL,
	`banco` varchar(10) NOT NULL,
	`agencia` varchar(10) NOT NULL,
	`tipo` varchar(10) NOT NULL,
	`conta` varchar(10) NOT NULL,
	`digito` varchar(10) NOT NULL,
	`variacao` varchar(10) NOT NULL,
	`titular` varchar(255) NOT NULL,
	PRIMARY KEY (`idContaBancaria`)
);

CREATE TABLE `Saque` (
	`idSaque` INT NOT NULL AUTO_INCREMENT,
	`idApostador` INT NOT NULL,
	`idContaBancaria` INT NOT NULL,
	`dataHora` DATETIME NOT NULL,
	`valor` DECIMAL(10,2) NOT NULL,
	PRIMARY KEY (`idSaque`)
);

CREATE TABLE `Deposito` (
	`idDeposito` INT NOT NULL AUTO_INCREMENT,
	`idApostador` INT NOT NULL,
	`valor` DECIMAL(10,2) NOT NULL,
	`dataHora` DATETIME NOT NULL,
	PRIMARY KEY (`idDeposito`)
);

CREATE TABLE `Resultado` (
	`idResultado` INT NOT NULL AUTO_INCREMENT,
	`idPartida` INT NOT NULL,
    `placar` BINARY NOT NULL,
	`pontosTimeA` INT NOT NULL,
	`pontosTimeB` INT NOT NULL,
	PRIMARY KEY (`idResultado`)
);

CREATE TABLE `Estadio` (
	`noEstadio` varchar(255) NOT NULL,
	`cidade` varchar(255) NOT NULL,
	`capacidade` varchar(255) NOT NULL,
	PRIMARY KEY (`noEstadio`)
);

CREATE TABLE `Campeonato` (
	`nome` varchar(255) NOT NULL,
	`idPartida` INT NOT NULL,
	PRIMARY KEY (`nome`)
);

ALTER TABLE `Endereco` ADD CONSTRAINT `Endereço_fk0` FOREIGN KEY (`idPessoa`) REFERENCES `Pessoa`(`idPessoa`);

ALTER TABLE `Partida` ADD CONSTRAINT `Partida_fk0` FOREIGN KEY (`idTimeA`) REFERENCES `Time`(`idTime`);

ALTER TABLE `Partida` ADD CONSTRAINT `Partida_fk1` FOREIGN KEY (`idTimeB`) REFERENCES `Time`(`idTime`);

ALTER TABLE `Funcionario` ADD CONSTRAINT `Funcionario_fk0` FOREIGN KEY (`idFuncionario`) REFERENCES `Pessoa`(`idPessoa`);

ALTER TABLE `Administrador` ADD CONSTRAINT `Administrador_fk0` FOREIGN KEY (`idAdministrador`) REFERENCES `Pessoa`(`idPessoa`);

ALTER TABLE `Apostador` ADD CONSTRAINT `Apostador_fk0` FOREIGN KEY (`idApostador`) REFERENCES `Pessoa`(`idPessoa`);

ALTER TABLE `Aposta` ADD CONSTRAINT `Aposta_fk0` FOREIGN KEY (`idUsuario`) REFERENCES `Apostador`(`idApostador`);

ALTER TABLE `Aposta` ADD CONSTRAINT `Aposta_fk1` FOREIGN KEY (`idPartida`) REFERENCES `Partida`(`idPartida`);

ALTER TABLE `ContaBancaria` ADD CONSTRAINT `ContaBancaria_fk0` FOREIGN KEY (`idApostador`) REFERENCES `Apostador`(`idApostador`);

ALTER TABLE `Deposito` ADD CONSTRAINT `Deposito_fk0` FOREIGN KEY (`idApostador`) REFERENCES `Apostador`(`idApostador`);

ALTER TABLE `Saque` ADD CONSTRAINT `Saque_fk0` FOREIGN KEY (`idApostador`) REFERENCES `Apostador`(`idApostador`);

ALTER TABLE `Saque` ADD CONSTRAINT `Saque_fk1` FOREIGN KEY (`idContaBancaria`) REFERENCES `ContaBancaria`(`idContaBancaria`);

ALTER TABLE `Resultado` ADD CONSTRAINT `Resultado_fk0` FOREIGN KEY (`idPartida`) REFERENCES `Partida`(`idPartida`);

ALTER TABLE `Campeonato` ADD CONSTRAINT `Campeonato_fk0` FOREIGN KEY (`idPartida`) REFERENCES `Partida`(`idPartida`);
