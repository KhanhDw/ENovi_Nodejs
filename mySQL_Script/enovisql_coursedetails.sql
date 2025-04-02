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
-- Table structure for table `coursedetails`
--

DROP TABLE IF EXISTS `coursedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursedetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseId` int NOT NULL,
  `overview` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `requirements` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `whatToLearn` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courseId` (`courseId`),
  CONSTRAINT `fk_coursedetails_course` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursedetails`
--

LOCK TABLES `coursedetails` WRITE;
/*!40000 ALTER TABLE `coursedetails` DISABLE KEYS */;
INSERT INTO `coursedetails` VALUES (42,62,'Master advanced Java programming techniques.','Deep dive into advanced Java topics.','Basic Java knowledge required.','Advanced Java concepts, design patterns, and best practices.'),(43,63,'Build modern web applications with React.','Learn to create interactive UIs using React.','Basic HTML, CSS, and JavaScript knowledge.','React components, state management, and routing.'),(44,64,'Introduction to data science concepts.','Learn the basics of data science and analysis.','Basic understanding of statistics.','Data analysis, visualization, and machine learning basics.'),(45,65,'Develop mobile apps for iOS and Android.','Learn to build cross-platform mobile apps.','Basic programming knowledge.','Mobile app development using frameworks like React Native.'),(46,66,'Introduction to machine learning algorithms.','Learn the fundamentals of machine learning.','Basic understanding of mathematics and statistics.','Machine learning algorithms, model training, and evaluation.'),(47,67,'Learn the principles of UI/UX design.','Create user-friendly interfaces.','No prior design experience needed.','UI/UX design principles, wireframing, and prototyping.'),(48,68,'Explore cloud computing concepts.','Learn about cloud services and infrastructure.','Basic IT knowledge.','Cloud computing models, services, and deployment.'),(49,69,'Create 3D games with Unity.','Learn game development using Unity.','Basic programming knowledge.','Unity engine, game mechanics, and 3D modeling.'),(50,70,'Learn digital marketing strategies.','Develop effective marketing campaigns.','No prior marketing experience needed.','Digital marketing channels, SEO, and social media marketing.'),(51,71,'Thực hành phân tích dữ liệu với Python','Sử dụng các thư viện như Pandas, NumPy để phân tích dữ liệu.','Kiến thức cơ bản về Python và thống kê.','Phân tích dữ liệu, xử lý dữ liệu và trực quan hóa dữ liệu với Python.'),(52,72,'Xây dựng ứng dụng web Fullstack','Xây dựng ứng dụng web hoàn chỉnh từ frontend đến backend.','Kiến thức về HTML, CSS, JavaScript và một ngôn ngữ backend (Node.js, Python...).','Xây dựng API, làm việc với database và triển khai ứng dụng web.'),(53,73,'Lập trình C++ từ cơ bản','Học lập trình C++ từ những khái niệm cơ bản nhất.','Không cần kiến thức lập trình trước.','Cấu trúc dữ liệu, thuật toán và lập trình hướng đối tượng với C++.'),(54,74,'Bảo mật mạng cơ bản','Tìm hiểu về các khái niệm cơ bản về bảo mật mạng.','Kiến thức cơ bản về mạng máy tính.','Các mối đe dọa bảo mật, phương pháp phòng chống và kiểm tra bảo mật.'),(55,75,'Lập trình JavaScript nâng cao','Nâng cao kỹ năng lập trình JavaScript với các khái niệm nâng cao.','Kiến thức vững chắc về JavaScript cơ bản.','Asynchronous programming, design patterns và tối ưu hóa hiệu năng JavaScript.'),(56,76,'Thiết kế cơ sở dữ liệu SQL','Thiết kế cơ sở dữ liệu quan hệ với SQL.','Kiến thức cơ bản về cơ sở dữ liệu.','Thiết kế bảng, truy vấn dữ liệu và tối ưu hóa hiệu năng cơ sở dữ liệu.'),(57,77,'Trí tuệ nhân tạo và học sâu','Tìm hiểu về các thuật toán và mô hình học sâu.','Kiến thức về toán cao cấp và lập trình Python.','Mạng nơ-ron, học sâu và các ứng dụng của trí tuệ nhân tạo.'),(58,78,'Thiết kế đồ họa cơ bản','Học các nguyên tắc thiết kế đồ họa cơ bản.','Không cần kinh nghiệm thiết kế trước.','Các công cụ thiết kế, nguyên tắc thiết kế và tạo ra các sản phẩm đồ họa đơn giản.'),(59,79,'Quản lý dự án chuyên nghiệp','Học các phương pháp quản lý dự án hiệu quả.','Không yêu cầu kiến thức chuyên môn.','Lập kế hoạch dự án, quản lý rủi ro và giao tiếp trong dự án.'),(60,80,'Kiểm thử xâm nhập đạo đức','Thực hành các kỹ thuật kiểm thử xâm nhập để đánh giá bảo mật hệ thống.','Kiến thức về mạng máy tính và bảo mật.','Các công cụ và kỹ thuật kiểm thử xâm nhập, báo cáo và khắc phục lỗ hổng bảo mật.'),(61,111,'Khóa học thiết kế đồ họa cơ bản với Adobe Photoshop.cc','<ul><li>Học&nbsp;cách&nbsp;sử&nbsp;dụng&nbsp;các&nbsp;công&nbsp;cụ&nbsp;cơ&nbsp;bản&nbsp;của&nbsp;Photoshop&nbsp;để&nbsp;chỉnh&nbsp;sửa&nbsp;ảnh,&nbsp;thiết&nbsp;kế&nbsp;banner&nbsp;và&nbsp;logo.&#39;32</li><li>32</li><li>32</li><li>3</li><li>2</li><li>32</li><li>32</li></ul>','<ul><li>biết&nbsp;python&nbsp;căn&nbsp;bản</li><li>nodejs&nbsp;căn&nbsp;bản</li><li>mysql&nbsp;căn&nbsp;bản</li></ul>','<ul><li>học&nbsp;được&nbsp;điều&nbsp;1</li><li><strong>học&nbsp;được&nbsp;điều&nbsp;2</strong></li><li><strong>học&nbsp;được&nbsp;điều&nbsp;3</strong></li><li><em>học&nbsp;được&nbsp;điều&nbsp;4</em></li></ul>');
/*!40000 ALTER TABLE `coursedetails` ENABLE KEYS */;
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
