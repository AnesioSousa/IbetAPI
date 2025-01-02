CREATE DATABASE  IF NOT EXISTS `ibet` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ibet`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: us-cdbr-east-06.cleardb.net    Database: ibet
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `idAdministrador` int(11) NOT NULL AUTO_INCREMENT,
  `idPessoa` int(11) NOT NULL,
  PRIMARY KEY (`idAdministrador`,`idPessoa`),
  CONSTRAINT `Administrador_fk0` FOREIGN KEY (`idAdministrador`) REFERENCES `pessoa` (`idPessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (4,824);
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aposta`
--

DROP TABLE IF EXISTS `aposta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aposta` (
  `idAposta` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idPartida` int(11) NOT NULL,
  `valor` float NOT NULL,
  `dataHora` datetime NOT NULL,
  `opcao` text NOT NULL,
  `pontosTimeA` int(11) DEFAULT NULL,
  `pontosTimeB` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAposta`),
  KEY `Aposta_fk0` (`idUsuario`),
  KEY `Aposta_fk1` (`idPartida`),
  CONSTRAINT `Aposta_fk0` FOREIGN KEY (`idUsuario`) REFERENCES `apostador` (`idApostador`),
  CONSTRAINT `Aposta_fk1` FOREIGN KEY (`idPartida`) REFERENCES `partida` (`idPartida`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aposta`
--

LOCK TABLES `aposta` WRITE;
/*!40000 ALTER TABLE `aposta` DISABLE KEYS */;
INSERT INTO `aposta` VALUES (1,64,1,200,'2022-01-12 00:00:00','Flamengo',1,2),(2,74,1,400,'2022-01-14 00:00:00','Fluminense',2,1),(3,104,1,100,'2022-01-14 00:00:00','Flamego',1,2),(14,424,1,2,'2022-12-16 15:17:11','1',NULL,NULL),(24,424,1,2,'2022-12-16 16:32:17','1',NULL,NULL);
/*!40000 ALTER TABLE `aposta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apostador`
--

DROP TABLE IF EXISTS `apostador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apostador` (
  `idApostador` int(11) NOT NULL AUTO_INCREMENT,
  `idPessoa` int(11) NOT NULL,
  `saldo` float DEFAULT NULL,
  PRIMARY KEY (`idApostador`,`idPessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=434 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apostador`
--

LOCK TABLES `apostador` WRITE;
/*!40000 ALTER TABLE `apostador` DISABLE KEYS */;
INSERT INTO `apostador` VALUES (64,174,702),(74,204,702),(84,224,NULL),(94,234,NULL),(104,254,702),(114,264,NULL),(124,274,NULL),(134,284,NULL),(144,344,NULL),(154,374,NULL),(164,384,NULL),(174,394,NULL),(184,404,NULL),(194,414,NULL),(204,434,NULL),(214,444,NULL),(224,454,NULL),(234,464,NULL),(244,484,NULL),(254,494,NULL),(274,574,NULL),(294,504,NULL),(304,584,NULL),(314,594,NULL),(324,604,NULL),(334,614,NULL),(344,624,NULL),(354,654,NULL),(364,664,NULL),(374,674,NULL),(384,694,NULL),(394,704,NULL),(404,754,NULL),(414,764,NULL),(424,874,9);
/*!40000 ALTER TABLE `apostador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campeonato`
--

DROP TABLE IF EXISTS `campeonato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campeonato` (
  `nome` varchar(255) NOT NULL,
  `idPartida` int(11) NOT NULL,
  PRIMARY KEY (`nome`),
  KEY `Campeonato_fk0` (`idPartida`),
  CONSTRAINT `Campeonato_fk0` FOREIGN KEY (`idPartida`) REFERENCES `partida` (`idPartida`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campeonato`
--

LOCK TABLES `campeonato` WRITE;
/*!40000 ALTER TABLE `campeonato` DISABLE KEYS */;
/*!40000 ALTER TABLE `campeonato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contabancaria`
--

DROP TABLE IF EXISTS `contabancaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contabancaria` (
  `idContaBancaria` int(11) NOT NULL AUTO_INCREMENT,
  `idApostador` int(11) NOT NULL,
  `banco` varchar(10) NOT NULL,
  `agencia` varchar(10) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `conta` varchar(10) NOT NULL,
  `digito` varchar(10) NOT NULL,
  `variacao` varchar(10) NOT NULL,
  `titular` varchar(255) NOT NULL,
  PRIMARY KEY (`idContaBancaria`),
  KEY `ContaBancaria_fk0` (`idApostador`),
  CONSTRAINT `ContaBancaria_fk0` FOREIGN KEY (`idApostador`) REFERENCES `apostador` (`idApostador`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contabancaria`
--

LOCK TABLES `contabancaria` WRITE;
/*!40000 ALTER TABLE `contabancaria` DISABLE KEYS */;
INSERT INTO `contabancaria` VALUES (14,64,'1','2','1','1','1','1','1');
/*!40000 ALTER TABLE `contabancaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposito`
--

DROP TABLE IF EXISTS `deposito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposito` (
  `idDeposito` int(11) NOT NULL AUTO_INCREMENT,
  `idApostador` int(11) NOT NULL,
  `valor` float NOT NULL,
  `dataHora` datetime NOT NULL,
  PRIMARY KEY (`idDeposito`),
  KEY `Deposito_fk0` (`idApostador`),
  CONSTRAINT `Deposito_fk0` FOREIGN KEY (`idApostador`) REFERENCES `apostador` (`idApostador`)
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposito`
--

LOCK TABLES `deposito` WRITE;
/*!40000 ALTER TABLE `deposito` DISABLE KEYS */;
INSERT INTO `deposito` VALUES (4,424,10,'0000-00-00 00:00:00'),(14,424,10,'0000-00-00 00:00:00'),(24,424,10,'0000-00-00 00:00:00'),(34,424,10,'0000-00-00 00:00:00'),(44,424,10,'0000-00-00 00:00:00'),(54,424,10,'0000-00-00 00:00:00'),(64,424,10,'0000-00-00 00:00:00'),(74,424,10,'0000-00-00 00:00:00'),(84,424,10,'0000-00-00 00:00:00'),(94,424,10,'0000-00-00 00:00:00'),(104,424,10,'0000-00-00 00:00:00'),(124,64,10,'0000-00-00 00:00:00'),(134,64,10,'0000-00-00 00:00:00'),(144,424,10,'2022-12-16 12:14:15'),(154,64,10,'0000-00-00 00:00:00'),(164,64,10,'0000-00-00 00:00:00'),(174,64,10,'0000-00-00 00:00:00'),(184,424,10,'2022-12-16 13:10:00'),(194,424,5,'2022-12-16 13:10:00'),(204,424,5,'2022-12-16 16:32:17'),(214,424,5,'2022-12-16 16:36:12');
/*!40000 ALTER TABLE `deposito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereço`
--

DROP TABLE IF EXISTS `endereço`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereço` (
  `idEndereco` int(11) NOT NULL AUTO_INCREMENT,
  `idPessoa` int(11) NOT NULL,
  `codigoPostal` varchar(8) NOT NULL,
  `logradouro` varchar(255) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `bairro` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `pais` varchar(255) NOT NULL,
  PRIMARY KEY (`idEndereco`),
  KEY `Endereço_fk0` (`idPessoa`),
  CONSTRAINT `Endereço_fk0` FOREIGN KEY (`idPessoa`) REFERENCES `pessoa` (`idPessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereço`
--

LOCK TABLES `endereço` WRITE;
/*!40000 ALTER TABLE `endereço` DISABLE KEYS */;
INSERT INTO `endereço` VALUES (1,174,'1','1','1','1','1','1','1','2'),(4,454,'testetst','testetst','testetst','testetst','testetst','testetst','testetst','testetst'),(24,484,'socorro1','socorro1','socorro1','socorro1','socorro1','socorro1','socorro1','socorro1'),(34,494,'socorro1','socorro11','socorro11','socorro11','socorro11','socorro11','socorro11','socorro11'),(44,514,'amem','amem','amem','amem','amem','amem','amem','amem'),(54,524,'amem1','amem1','amem1','amem1','amem1','amem1','amem1','amem1'),(64,544,'amem13','amem13','amem13','amem13','amem13','amem13','amem13','amem13'),(74,574,'teste123','teste12345','teste12345','teste12345','teste12345','teste12345','teste12345','teste12345'),(84,664,'meudeusf','meudeusfunciona','meudeusfun','meudeusfunciona','meudeusfunciona','meudeusfunciona','meudeusfunciona','meudeusfunciona'),(94,674,'testeeee','testeeeeeeee3','testeeeeee','testeeeeeeee3','testeeeeeeee3','testeeeeeeee3','testeeeeeeee3','testeeeeeeee3'),(104,704,'12312312','AAAAAAAAAA2','AAAAAAAAAA','AAAAAAAAAA2','AAAAAAAAAA2','AAAAAAAAAA2','AAAAAAAAAA2','AAAAAAAAAA2'),(114,754,'66666666','MACARRÃO','12','MACARRÃO','MACARRÃO','MACARRÃO','MACARRÃO','MACARRÃO'),(124,764,'47070707','Rua dos bobos','0','onde judar perdeu as botas','feira 6','feira de santana ','Bahia','Brasil '),(134,844,'meudeuss','meudeussocororoo','meudeussoc','meudeussocororoo','meudeussocororoo','meudeussocororoo','meudeussocororoo','meudeussocororoo'),(144,854,'aahshhdd','aahshhddgg','aahshhddgg','aahshhddgg','aahshhddgg','aahshhddgg','aahshhddgg','aahshhddgg'),(154,874,'tantanta','tantantaaa','tantantaaa','tantantaaa','tantantaaa','tantantaaa','tantantaaa','tantantaaa');
/*!40000 ALTER TABLE `endereço` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadio`
--

DROP TABLE IF EXISTS `estadio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadio` (
  `noEstadio` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `capacidade` varchar(255) NOT NULL,
  PRIMARY KEY (`noEstadio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadio`
--

LOCK TABLES `estadio` WRITE;
/*!40000 ALTER TABLE `estadio` DISABLE KEYS */;
INSERT INTO `estadio` VALUES ('1','FSA','2000'),('2','Salvador','4000');
/*!40000 ALTER TABLE `estadio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionario` (
  `idFuncionario` int(11) NOT NULL AUTO_INCREMENT,
  `idPessoa` int(11) NOT NULL,
  PRIMARY KEY (`idFuncionario`,`idPessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario`
--

LOCK TABLES `funcionario` WRITE;
/*!40000 ALTER TABLE `funcionario` DISABLE KEYS */;
INSERT INTO `funcionario` VALUES (44,564),(54,794),(64,804);
/*!40000 ALTER TABLE `funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partida`
--

DROP TABLE IF EXISTS `partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partida` (
  `idPartida` int(11) NOT NULL AUTO_INCREMENT,
  `idTimeA` int(11) NOT NULL,
  `idTimeB` int(11) NOT NULL,
  `dataHoraInicio` datetime NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '1, 2, 3, 4',
  `descricaoStatus` text NOT NULL,
  PRIMARY KEY (`idPartida`),
  KEY `Partida_fk0` (`idTimeA`),
  KEY `Partida_fk1` (`idTimeB`),
  CONSTRAINT `Partida_fk0` FOREIGN KEY (`idTimeA`) REFERENCES `time` (`idTime`),
  CONSTRAINT `Partida_fk1` FOREIGN KEY (`idTimeB`) REFERENCES `time` (`idTime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partida`
--

LOCK TABLES `partida` WRITE;
/*!40000 ALTER TABLE `partida` DISABLE KEYS */;
INSERT INTO `partida` VALUES (1,1,2,'2022-01-26 00:00:00','F','Finalizada');
/*!40000 ALTER TABLE `partida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoa` (
  `idPessoa` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `telefone` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dataNascimento` date NOT NULL,
  `username` varchar(50) NOT NULL,
  `senha` varchar(16) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  PRIMARY KEY (`idPessoa`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=884 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa`
--

LOCK TABLES `pessoa` WRITE;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` VALUES (4,'maria','11111111111','11111111111','2011-11-11','11111111111','11111111111','11111111111'),(44,'maria','11111111111','111111111112','2011-11-11','111111141111','11111111111','11311111111'),(64,'maria','11111111144','11111111441112','2011-11-11','11114411141111','11111111111','11311141111'),(84,'maria','111134411','111111131112','2011-11-11','111144341111','11111111111','11311311111'),(104,'maria','111134411','11114112','2011-11-11','11114111','11111111111','11341111'),(114,'maria','1111711','11114222222112','2011-11-11','11122222711','11111111111','11741122222'),(124,'maria','1111711','111142224334222112','2011-11-11','1112224222711','11111111111','11742341122'),(134,'maria','1111711','11114888222112','2011-11-11','1118882711','11111111111','11748822221'),(144,'maria','1111711','111722112','2011-11-11','1118877782711','11111111111','117488711'),(164,'maria','1111711','11175555512','0000-00-00','111887555711','11111111111','11748333331'),(174,'33333','12345678910','email@email.email','0000-00-00','loginlogin','123456789','12345678910'),(204,'nome','12345678910','email@emaial.email','1111-11-11','login','senhamtdificil','12345678911'),(224,'nome','12345678910','email@email.emaill','1111-11-11','logas','senha','12345678912'),(234,'a','12345678910','email@email.emails','2022-11-16','a','senha','12345678913'),(254,'nome sobrenome','12345678910','emaail@email.email','1111-11-11','loginlogina','senha','12345678915'),(264,'nome sobrenome','12345678910','email@email.emaila','2022-11-16','loginloginlogin','senhamtdificil','12345678916'),(274,'Teste','75999999999','teste@testando.com','0000-00-00','testudo','teste123','00000000000'),(284,'','','','0000-00-00','','',''),(344,'armando','7591919191','anesios98@gmail.com','0000-00-00','cabeça','teste123','00000000001'),(374,'147852369','14785236989','emailemail@email','2022-11-16','emailemail','emailemail','12345678958'),(384,'sedrcfvghbjnkm','12345678974','12346521321@1','1111-11-11','email1','email1','12345678974'),(394,'teste','00000000','asasa@email','0000-00-00','teste5','teste5','212121211'),(404,'aaaaaaa','aaaaaaa','aaaaaaa','0000-00-00','aaaaaaa','aaaaaaa','aaaaaaa'),(414,'aaaaaabba','aaaaabbaa','aaaaabbaa','0000-00-00','aaaabbaaa','aaabbaaaa','aaaaabbaa'),(434,'aaaaaasbba','aaaaabsbaa','aaaaabsbaa','0000-00-00','aaaabbsaaa','aaabbaasaa','aaaaabbsaa'),(444,'aaa3aaasbba','aaaa3absbaa','aaaaa3bsbaa','0000-00-00','aaaabb3saaa','aaabba3asaa','aaaaab3bsaa'),(454,'testetst','testetst','testetst','0000-00-00','testetst','testetst','testetst'),(464,'socorro','socorro','socorro','0000-00-00','socorro','socorro','socorro'),(484,'socorro1','socorro1','socorro1','0000-00-00','socorro1','socorro1','socorro1'),(494,'socorro11','socorro11','socorro11','0000-00-00','socorro11','socorro11','socorro11'),(504,'Ronald','75991919191','Ronaldo@Ibet.com','0000-00-00','ronaldinho','123','44444444478'),(514,'amem','amem','amem','0000-00-00','amem','amem','amem'),(524,'amem1','amem1','amem1','0000-00-00','amem1','amem1','amem1'),(544,'amem13','amem13','amem13','0000-00-00','amem13','amem13','amem13'),(554,'teste123','teste123','teste123','0000-00-00','teste123','teste123','teste123'),(564,'teste1234','teste1234','teste1234','0000-00-00','teste1234','teste1234','teste1234'),(574,'teste12345','teste12345','teste12345','0000-00-00','teste12345','teste12345','teste12345'),(584,'sas','asa','as','0000-00-00','as','as','as'),(594,'maisum','75994949494','example@email.com','1950-05-15','example','example@email.co','77777777777'),(604,'aroudsons','11945458484','aroudo@ibet.com','2000-04-02','aroudocarioca','aroudo@ibet.com','33333333333'),(614,'123123','123123','123123','0000-00-00','123123','123123','44444444444'),(624,'çaçaça','77777777777','help@helpmepls.com','0000-00-00','i\'mdying','123','13333333333'),(654,'asdasd','6666666666','meuamigo@quesofrencia.com','0000-00-00','macacosMeMordam','123','66666666666'),(664,'meudeusfunciona','meudeusfunc','meudeusfunciona','0000-00-00','meudeusfunciona','meudeusfunciona','meudeusfunc'),(674,'testeeeeeeee3','testeeeeeee','testeeeeeeee3','0000-00-00','testeeeeeeee3','testeeeeeeee3','testeeeeeee'),(694,'armando','99999999999','fast@faster.com','0000-00-00','rapidao','123','11111111133'),(704,'AAAAAAAAAA2','12312321321','meeeee@ibet.com','0000-00-00','123ibet','123','12312321312'),(754,'MACARRÃO','75999999999','bruno@goleiro.com','0000-00-00','MACARRÃO','12','95959566666'),(764,'Américoi','7597979794','americo@ibet.com','0000-00-00','americo10','123','66444444444'),(794,'eujanaoseimais','eujanaoseim','eujanaoseimais','0000-00-00','eujanaoseimais','eujanaoseimais','eujanaoseim'),(804,'acabaplmdds','acabaplmdds','acabaplmdds','0000-00-00','acabaplmdds','acabaplmdds','acabaplmdds'),(814,'pblpblpbl','pblpblpbl','pblpblpbl','0000-00-00','pblpblpbl','pblpblpbl','pblpblpbl'),(824,'copaaaaa','copaaaaa','copaaaaa','0000-00-00','copaaaaa','copaaaaa','copaaaaa'),(834,'copaaaaa111','copaaaaa111','copaaaaa111','0000-00-00','copaaaaa111','copaaaaa111','copaaaaa111'),(844,'meudeussocororoo','meudeussoco','meudeussocororoo','0000-00-00','meudeussocororoo','meudeussocororoo','meudeussoco'),(854,'aahshhddgg','aahshhddgg','aahshhddgg','0000-00-00','aahshhddgg','aahshhddgg','aahshhddgg'),(874,'tantantaaa','tantantaaa','tantantaaa','0000-00-00','tantantaaa','tantantaaa','tantantaaa');
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultado`
--

DROP TABLE IF EXISTS `resultado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultado` (
  `idResultado` int(11) NOT NULL AUTO_INCREMENT,
  `idPartida` int(11) NOT NULL,
  `placar` binary(1) NOT NULL,
  `pontosTimeA` int(11) NOT NULL,
  `pontosTimeB` int(11) NOT NULL,
  PRIMARY KEY (`idResultado`),
  KEY `Resultado_fk0` (`idPartida`),
  CONSTRAINT `Resultado_fk0` FOREIGN KEY (`idPartida`) REFERENCES `partida` (`idPartida`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultado`
--

LOCK TABLES `resultado` WRITE;
/*!40000 ALTER TABLE `resultado` DISABLE KEYS */;
INSERT INTO `resultado` VALUES (1,1,_binary '\0',3,2);
/*!40000 ALTER TABLE `resultado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saque`
--

DROP TABLE IF EXISTS `saque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saque` (
  `idSaque` int(11) NOT NULL AUTO_INCREMENT,
  `idContaBancaria` int(11) NOT NULL,
  `dataHora` datetime NOT NULL,
  `valor` float NOT NULL,
  `idApostador` int(11) NOT NULL,
  PRIMARY KEY (`idSaque`,`idContaBancaria`),
  KEY `idApostador` (`idApostador`),
  CONSTRAINT `saque_ibfk_1` FOREIGN KEY (`idApostador`) REFERENCES `apostador` (`idApostador`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saque`
--

LOCK TABLES `saque` WRITE;
/*!40000 ALTER TABLE `saque` DISABLE KEYS */;
INSERT INTO `saque` VALUES (4,1,'2022-12-16 15:03:35',7,424),(14,1,'2022-12-16 15:06:51',7,424),(24,2,'2022-12-16 16:36:12',5,424);
/*!40000 ALTER TABLE `saque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time`
--

DROP TABLE IF EXISTS `time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time` (
  `idTime` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `pais` varchar(255) NOT NULL,
  PRIMARY KEY (`idTime`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time`
--

LOCK TABLES `time` WRITE;
/*!40000 ALTER TABLE `time` DISABLE KEYS */;
INSERT INTO `time` VALUES (1,'Flamengo','BR'),(2,'Fluminense','BR'),(34,'Flamengo','Brasil'),(44,'Corinthians','Brasil'),(54,'Palmeiras','Brasil'),(64,'Santos','Brasil');
/*!40000 ALTER TABLE `time` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-16 17:02:08
