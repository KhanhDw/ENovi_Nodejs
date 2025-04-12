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
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `level` enum('beginner','intermediate','advanced','all') NOT NULL DEFAULT 'all',
  `instructorId` int NOT NULL,
  `status` enum('suspended','active','limited') DEFAULT 'limited',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rating` decimal(3,2) NOT NULL DEFAULT '0.00',
  `img` text,
  `duration` int DEFAULT '0',
  `languages` varchar(10) NOT NULL DEFAULT 'vi',
  `code_discount` varchar(40) DEFAULT NULL,
  `percent_discount` int NOT NULL DEFAULT '0',
  `subtitles` varchar(10) DEFAULT NULL,
  `intro_video` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_courses_instructor` (`instructorId`),
  KEY `fk_courses_languages` (`languages`),
  KEY `fk_courses_subtitles` (`subtitles`),
  CONSTRAINT `fk_courses_instructor` FOREIGN KEY (`instructorId`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_courses_languages` FOREIGN KEY (`languages`) REFERENCES `languages` (`language_code`),
  CONSTRAINT `fk_courses_subtitles` FOREIGN KEY (`subtitles`) REFERENCES `languages` (`language_code`),
  CONSTRAINT `check_percent_discount` CHECK ((`percent_discount` between 0 and 100))
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (62,'Advanced Java Programming - Updated - Updated - Updated',0,'intermediate',33,'active','2025-02-28 14:35:17','2025-03-21 10:41:28',5.00,'banner_20250312083846088.JPG',357,'vi',NULL,90,NULL,NULL),(63,'Web Development with React - Updated - Updated - Updated',6227,'beginner',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',4.00,'banner_20250312083846088.JPG',1337,'vi',NULL,90,NULL,NULL),(64,'Data Science Fundamentals - Updated - Updated - Updated',488224,'advanced',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',3.20,'banner_20250312083846088.JPG',835,'vi',NULL,90,NULL,NULL),(65,'Mobile App Development - Updated - Updated - Updated',2421440,'beginner',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',4.80,'banner_20250312083846088.JPG',373,'vi',NULL,90,NULL,NULL),(66,'Machine Learning Basics - Updated - Updated - Updated',1644529,'advanced',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',4.00,'banner_20250312083846088.JPG',898,'vi',NULL,90,NULL,NULL),(67,'UI/UX Design - Updated - Updated - Updated',957326,'intermediate',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',4.40,'banner_20250312083846088.JPG',1292,'vi',NULL,90,NULL,NULL),(68,'Cloud Computing Essentials - Updated - Updated - Updated',2851045,'beginner',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',3.60,'banner_20250312083846088.JPG',1297,'vi',NULL,90,NULL,NULL),(69,'Game Development with Unity - Updated - Updated - Updated',2385246,'beginner',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',4.90,'banner_20250312083846088.JPG',667,'vi',NULL,90,NULL,NULL),(70,'Digital Marketing Strategy - Updated - Updated - Updated',373098,'beginner',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',4.40,'banner_20250312083846088.JPG',1212,'vi',NULL,90,NULL,NULL),(71,'Python for Data Analysis - Updated - Updated - Updated',706750,'beginner',33,'limited','2025-02-28 14:35:17','2025-03-14 16:24:39',3.00,'banner_20250312083846088.JPG',414,'vi',NULL,90,NULL,NULL),(72,'Fullstack Web Dev - Updated - Updated - Updated',2413456,'beginner',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',3.20,'banner_20250312083846088.JPG',1027,'vi',NULL,90,NULL,NULL),(73,'Intro to C++ - Updated - Updated - Updated',949032,'all',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',3.50,'banner_20250312083846088.JPG',69,'vi',NULL,90,NULL,NULL),(74,'CyberSecurity Basics - Updated - Updated - Updated',502793,'beginner',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',4.50,'banner_20250312083846088.JPG',971,'vi',NULL,90,NULL,NULL),(75,'Advanced JavaScript - Updated - Updated - Updated',2664871,'beginner',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',3.20,'banner_20250312083846088.JPG',609,'vi',NULL,90,NULL,NULL),(76,'SQL Database Design - Updated - Updated - Updated',2817976,'all',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',4.10,'banner_20250312083846088.JPG',1225,'vi',NULL,90,NULL,NULL),(77,'AI and Deep Learning - Updated - Updated - Updated',96267,'beginner',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',4.80,'banner_20250312083846088.JPG',1103,'vi',NULL,90,NULL,NULL),(78,'Graphic Design 101 - Updated - Updated - Updated',1023408,'beginner',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',4.50,'banner_20250312083846088.JPG',384,'vi',NULL,90,NULL,NULL),(79,'Project Management - Updated - Updated - Updated',1828239,'intermediate',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',3.20,'banner_20250312083846088.JPG',102,'vi',NULL,90,NULL,NULL),(80,'Ethical Hacking - Updated - Updated - Updated',71972,'intermediate',33,'active','2025-02-28 14:35:17','2025-03-14 16:24:39',3.50,'banner_20250312083846088.JPG',924,'vi',NULL,90,NULL,NULL),(81,'Introduction to Python - Updated - Updated - Updated',872143,'advanced',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',5.00,'banner_20250312083846088.JPG',697,'vi',NULL,90,NULL,NULL),(82,'Introduction to Python - Updated - Updated - Updated',1144800,'intermediate',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',3.80,'banner_20250312083846088.JPG',374,'vi',NULL,90,NULL,NULL),(83,'Introduction to Python - Updated - Updated - Updated',107573,'beginner',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',4.50,'banner_20250312083846088.JPG',1167,'vi',NULL,90,NULL,NULL),(84,'Introduction to Python - Updated - Updated - Updated',101465,'intermediate',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',3.60,'banner_20250312083846088.JPG',699,'vi',NULL,90,NULL,NULL),(85,'Introduction to Python - Updated - Updated - Updated',183605,'all',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',3.40,'banner_20250312083846088.JPG',408,'vi',NULL,90,NULL,NULL),(86,'Introduction to Python - Updated - Updated - Updated',612634,'advanced',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',4.30,'banner_20250312083846088.JPG',1216,'vi',NULL,90,NULL,NULL),(87,'Introduction to Python - Updated - Updated - Updated',2511352,'advanced',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',3.50,'banner_20250312083846088.JPG',976,'vi',NULL,90,NULL,NULL),(88,'Introduction to Python - Updated - Updated - Updated',1720859,'beginner',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',4.20,'banner_20250312083846088.JPG',1090,'vi',NULL,90,NULL,NULL),(89,'Introduction to Python - Updated - Updated - Updated',1069242,'intermediate',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',3.60,'banner_20250312083846088.JPG',117,'vi',NULL,90,NULL,NULL),(90,'Introduction to Python - Updated - Updated - Updated',182633,'advanced',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',4.70,'banner_20250312083846088.JPG',818,'vi',NULL,90,NULL,NULL),(91,'Introduction to Python - Updated - Updated - Updated',703440,'beginner',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',4.90,'banner_20250312083846088.JPG',1297,'vi',NULL,90,NULL,NULL),(92,'Introduction to Python - Updated - Updated - Updated',2968303,'beginner',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',3.40,'banner_20250312083846088.JPG',1188,'vi',NULL,90,NULL,NULL),(93,'Introduction to Python - Updated - Updated - Updated',734193,'all',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',4.10,'banner_20250312083846088.JPG',1174,'vi',NULL,90,NULL,NULL),(94,'Introduction to Python - Updated - Updated - Updated',763056,'beginner',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',3.70,'banner_20250312083846088.JPG',838,'vi',NULL,90,NULL,NULL),(95,'Introduction to Python - Updated - Updated - Updated',1611702,'advanced',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',4.20,'banner_20250312083846088.JPG',470,'vi',NULL,90,NULL,NULL),(96,'Introduction to Python - Updated - Updated - Updated',2769345,'all',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',4.70,'banner_20250312083846088.JPG',606,'vi',NULL,90,NULL,NULL),(97,'Introduction to Python - Updated - Updated - Updated',13618,'all',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',4.30,'banner_20250312083846088.JPG',164,'vi',NULL,90,NULL,NULL),(98,'Introduction to Python - Updated - Updated - Updated',756056,'intermediate',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',4.70,'banner_20250312083846088.JPG',818,'vi',NULL,90,NULL,NULL),(99,'Introduction to Python - Updated - Updated - Updated',739427,'beginner',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',3.80,'banner_20250312083846088.JPG',1116,'vi',NULL,90,NULL,NULL),(100,'Introduction to Python - Updated - Updated - Updated',1427965,'all',33,'active','2025-03-03 21:23:14','2025-03-14 16:24:39',4.90,'banner_20250312083846088.JPG',1290,'vi',NULL,90,NULL,NULL),(102,'Introduction to Python - Updated - Updated - Updated',2323839,'intermediate',33,'active','2025-03-04 15:01:30','2025-03-14 16:24:39',3.40,'banner_20250312083846088.JPG',18,'vi',NULL,90,NULL,NULL),(104,'Introduction to Python - Updated - Updated - Updated',1302261,'advanced',33,'active','2025-03-04 15:01:30','2025-03-14 16:24:39',3.30,'banner_20250312083846088.JPG',805,'vi',NULL,90,NULL,NULL),(108,'Introduction to Python - Updated - Updated - Updated',859638,'advanced',33,'active','2025-03-04 15:01:30','2025-03-14 16:24:39',4.00,'banner_20250312083846088.JPG',316,'vi',NULL,90,NULL,NULL),(111,'New Title 1111.222 cập nhật 122 bản cập nhật ngày 22 tháng 3 năm 2025 bootscamp tiếng việt, tiếng anh',99999,'advanced',33,'active','2025-03-04 15:01:30','2025-03-30 14:27:49',2.57,'excelmaster_20250327032416937.png',3,'en',NULL,90,'en','video9_20250330072749410.mp4'),(121,'new course hehe',12121244,'all',33,'active','2025-03-17 14:40:20','2025-03-17 14:40:20',0.00,NULL,0,'vi',NULL,0,NULL,NULL),(132,'Đây là mới cập nhật1',0,'advanced',33,'active','2025-03-30 21:15:41','2025-03-30 21:15:41',2.57,'excelmaster_20250327032416937.png',3,'en','90',0,NULL,'video9_20250330072749410.mp4'),(133,'Đây là mới cập nhật2',0,'advanced',33,'active','2025-03-30 21:15:41','2025-03-30 21:15:41',2.57,'excelmaster_20250327032416937.png',3,'en','90',0,NULL,'video9_20250330072749410.mp4'),(134,'Đây là mới cập nhật3',0,'advanced',33,'active','2025-03-30 21:15:41','2025-03-30 21:15:41',2.57,'excelmaster_20250327032416937.png',3,'en','90',0,NULL,'video9_20250330072749410.mp4'),(135,'Đây là mới cập nhật4',0,'advanced',33,'active','2025-03-30 21:15:41','2025-03-30 21:15:41',2.57,'excelmaster_20250327032416937.png',3,'en','90',0,NULL,'video9_20250330072749410.mp4'),(136,'tesst',25000,'all',33,'active','2025-04-12 09:13:23','2025-04-12 09:13:23',0.00,NULL,0,'vi',NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
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
