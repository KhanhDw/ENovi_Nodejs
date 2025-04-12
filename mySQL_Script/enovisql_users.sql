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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `googleId` varchar(255) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` text,
  `role` enum('student','instructor','admin') NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `website` varchar(250) DEFAULT NULL,
  `biography` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (33,'104795311548734542923','Thanh Phong 215 đã điều chỉnh','ngothanhphong215@gmail.com','$2b$05$3muJF0wiK/.mnEcR5zqZpudk1DuD8aN8klFbets6g5sxrBToKnmVK','avatar_33_20250322_194147.png','admin',NULL,NULL,'2025-05-29 00:00:00','googlelle.com đã điều chỉnh','<p>Đây&nbsp;là&nbsp;tiêu&nbsp;sử&nbsp;của&nbsp;tôi&nbsp;đã&nbsp;điều&nbsp;chỉnh&nbsp;1</p>'),(34,'123456789012345678901','john_doe','john.doe@example.com','hashed_password_1','avatar1.jpg','student',NULL,NULL,'2025-05-20 00:00:00',NULL,NULL),(35,'123456789012345678902','jane_smith','jane.smith@example.com','hashed_password_2','avatar2.jpg','instructor',NULL,NULL,'2025-09-08 00:00:00',NULL,NULL),(36,'123456789012345678903','admin_user','admin@example.com','hashed_password_3','avatar3.jpg','admin',NULL,NULL,'2025-04-17 00:00:00',NULL,NULL),(37,'123456789012345678904','student1','student1@example.com','hashed_password_4','avatar4.jpg','student',NULL,NULL,'2025-05-25 00:00:00',NULL,NULL),(38,'123456789012345678905','instructor1','instructor1@example.com','hashed_password_5','avatar5.jpg','instructor',NULL,NULL,'2025-02-10 00:00:00',NULL,NULL),(39,'123456789012345678906','student2','student2@example.com','hashed_password_6','avatar6.jpg','student',NULL,NULL,'2025-05-14 00:00:00',NULL,NULL),(40,'123456789012345678907','instructor2','instructor2@example.com','hashed_password_7','avatar7.jpg','instructor',NULL,NULL,'2025-06-29 00:00:00',NULL,NULL),(41,'123456789012345678908','student3','student3@example.com','hashed_password_8','avatar8.jpg','student',NULL,NULL,'2025-05-12 00:00:00',NULL,NULL),(42,'123456789012345678909','instructor3','instructor3@example.com','hashed_password_9','avatar9.jpg','instructor',NULL,NULL,'2025-05-02 00:00:00',NULL,NULL),(43,'123456789012345678910','student4','student4@example.com','hashed_password_10','avatar10.jpg','student',NULL,NULL,'2025-08-02 00:00:00',NULL,NULL),(44,NULL,'user11','user11@example.com','hashed_password_11','avatar11.jpg','student','reset_token_1','2024-12-31 23:59:59','2025-12-04 00:00:00',NULL,NULL),(45,NULL,'user12','user12@example.com','hashed_password_12','avatar12.jpg','instructor',NULL,NULL,'2025-11-14 00:00:00',NULL,NULL),(46,NULL,'user13','user13@example.com','hashed_password_13','avatar13.jpg','student',NULL,NULL,'2025-07-28 00:00:00',NULL,NULL),(47,NULL,'user14','user14@example.com','hashed_password_14','avatar14.jpg','instructor','reset_token_2','2024-12-25 12:00:00','2025-03-31 00:00:00',NULL,NULL),(48,NULL,'user15','user15@example.com','hashed_password_15','avatar15.jpg','student',NULL,NULL,'2025-07-05 00:00:00',NULL,NULL),(49,NULL,'user16','user16@example.com','hashed_password_16','avatar16.jpg','instructor',NULL,NULL,'2025-10-24 00:00:00',NULL,NULL),(50,NULL,'user17','user17@example.com','hashed_password_17','avatar17.jpg','student',NULL,NULL,'2025-07-17 00:00:00',NULL,NULL),(51,NULL,'user18','user18@example.com','hashed_password_18','avatar18.jpg','instructor',NULL,NULL,'2025-04-06 00:00:00',NULL,NULL),(52,NULL,'user19','user19@example.com','hashed_password_19','avatar19.jpg','student',NULL,NULL,'2025-09-06 00:00:00',NULL,NULL),(55,'109904975707499172767','YOUTUBE 4 C','yc788720@gmail.com','$2b$05$rwKlJT1dd9337VciGTamzu6oFf82w5y3ox0NR18iDtSi3mBtr/xwC','https://lh3.googleusercontent.com/a/ACg8ocK4Is6hHphFROfUJbAMzBT7ONUElRKqLklt2gfXY0ehcQIXgQ=s96-c','instructor',NULL,NULL,'2025-03-26 09:03:37',NULL,NULL),(70,'109463439426498796823','NGÔ NGUYỄN GIA KHÁNH','khanh_dth215965@student.agu.edu.vn','$2b$05$e7GDl50IwjN9AIR8Fc8gFu7Q4YrjvJ5YpEVbFLi15/g6YyWSLMJKq','https://lh3.googleusercontent.com/a/ACg8ocKjTFLX8puGI1jjJ41BWMW-mLh3XdYRpXOt9W1h7nCPbsqMMQ=s96-c','student',NULL,NULL,'2025-04-12 13:36:57',NULL,NULL),(73,'110543068517056027654','Courese Enovi','enovi00site00host@gmail.com','$2b$05$k9woPTeVB.GRT6FnncGN3OXKJpqgNsNUX/aMDs6xiRRu3dCAR.8D6','https://lh3.googleusercontent.com/a/ACg8ocJ87EDSKe2BJHqyQWRyzIdFH46vgVSagN0xXyiDuwdf4gumkA=s96-c','student',NULL,NULL,'2025-04-12 15:27:28',NULL,NULL),(77,'118310943039597663702','YOUTUBE 1 C','luitantruocgio227762@gmail.com','$2b$05$EiQn4H.zXbQa5VV475OxY..QYN4KijR8tI2dXoKZJUpDugVoASmyq','https://lh3.googleusercontent.com/a/ACg8ocJlkAs2su1wQepZ1jdCgJ5UP4nyqbIVMbYpmGs2RNN_UIPktw=s96-c','student',NULL,NULL,'2025-04-12 16:07:59',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
