-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: enovisql
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `banks`
--

DROP TABLE IF EXISTS `banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameBank` text NOT NULL,
  `logo` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banks`
--

LOCK TABLES `banks` WRITE;
/*!40000 ALTER TABLE `banks` DISABLE KEYS */;
INSERT INTO `banks` VALUES (1,'Agribank','agribank_logo.png'),(2,'GPBank','gpbank_logo.png'),(3,'OceanBank','oceanbank_logo.png'),(4,'CBBank','cbbank_logo.png'),(5,'VietinBank','vietinbank_logo.png'),(6,'BIDV','bidv_logo.png'),(7,'Vietcombank','vietcombank_logo.png'),(8,'ACB','acb_logo.png'),(9,'ABBank','abbank_logo.png'),(10,'Viet Capital Bank','vietcapitalbank_logo.png'),(11,'BaoViet Bank','baovietbank_logo.png'),(12,'Bac A Bank','baca_bank_logo.png'),(13,'LienVietPostBank','lienvietpostbank_logo.png'),(14,'PVcomBank','pvcombank_logo.png'),(15,'DongA Bank','donga_bank_logo.png'),(16,'SeABank','seabank_logo.png'),(17,'MSB','msb_logo.png'),(18,'Kienlongbank','kienlongbank_logo.png'),(19,'Techcombank','techcombank_logo.png'),(20,'Nam A Bank','namabank_logo.png'),(21,'OCB','ocb_logo.png'),(22,'MB Bank','mbbank_logo.png'),(23,'VIB','vib_logo.png'),(24,'NCB','ncb_logo.png'),(25,'SCB','scb_logo.png'),(26,'SaiGonBank','saigonbank_logo.png'),(27,'SHB','shb_logo.png'),(28,'Sacombank','sacombank_logo.png'),(29,'TPBank','tpbank_logo.png'),(30,'VietABank','vietabank_logo.png'),(31,'VPBank','vpbank_logo.png'),(32,'Vietbank','vietbank_logo.png'),(33,'PG Bank','pgbank_logo.png'),(34,'Eximbank','eximbank_logo.png'),(35,'HDBank','hdbank_logo.png');
/*!40000 ALTER TABLE `banks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-12 16:10:43
