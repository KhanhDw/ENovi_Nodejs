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
-- Table structure for table `categoriesv2`
--

DROP TABLE IF EXISTS `categoriesv2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoriesv2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoriesV1_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_CategoriesV2_CategoriesV1` (`categoriesV1_id`),
  CONSTRAINT `fk_CategoriesV2_CategoriesV1` FOREIGN KEY (`categoriesV1_id`) REFERENCES `categoriesv1` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoriesv2`
--

LOCK TABLES `categoriesv2` WRITE;
/*!40000 ALTER TABLE `categoriesv2` DISABLE KEYS */;
INSERT INTO `categoriesv2` VALUES (1,'HTML/CSS cơ bản',1),(2,'JavaScript nâng cao',1),(3,'React Native cho người mới',2),(4,'Swift cho iOS',2),(5,'Photoshop từ A-Z',3),(6,'Illustrator chuyên sâu',3),(7,'Thiết kế wireframe',4),(8,'Thiết kế prototype',4),(9,'Facebook Ads cơ bản',5),(10,'Google Ads nâng cao',5),(11,'On-page SEO',6),(12,'Off-page SEO',6),(13,'Tiếng Anh giao tiếp hàng ngày',7),(14,'Luyện thi JLPT N5',8);
/*!40000 ALTER TABLE `categoriesv2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-12 16:10:42
