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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_comments_user` (`userId`),
  KEY `fk_comments_course` (`courseId`),
  CONSTRAINT `fk_comments_course` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,34,111,'Tôi thích cách giảng dạy của giảng viên.','2025-03-29 23:28:03'),(3,35,111,'Nội dung khóa học dễ hiểu và thực tế.','2025-03-29 23:28:03'),(4,36,111,'Tôi đã học được rất nhiều kiến thức mới.','2025-03-29 23:28:03'),(5,37,111,'Cảm ơn vì khóa học tuyệt vời này!','2025-03-29 23:28:03'),(6,38,111,'Phần bài tập thực hành rất hữu ích.','2025-03-29 23:28:03'),(14,33,111,'thật tuyệt vời','2025-03-30 08:47:49'),(15,55,111,'Website khoa học này thực sự là một kho tàng tri thức quý giá, là điểm đến lý tưởng cho những ai đam mê khám phá và học hỏi. Giao diện trang web được thiết kế hiện đại, trực quan, giúp người dùng dễ dàng tìm kiếm thông tin mình cần. Nội dung các bài viết được trình bày một cách khoa học, logic, có tính ứng dụng cao, giúp người đọc hiểu sâu hơn về các vấn đề khoa học. Đặc biệt, website còn có nhiều hình ảnh, video minh họa sinh động, giúp tăng tính trực quan và hấp dẫn cho người xem. Tôi đánh giá cao sự nỗ lực và tâm huyết của đội ngũ phát triển website trong việc mang đến một nguồn tài liệu khoa học chất lượng, đáng tin cậy cho cộng đồng.','2025-03-30 08:58:51');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-02 15:38:38
