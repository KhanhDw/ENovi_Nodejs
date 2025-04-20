CREATE DATABASE Enovi;

USE Enovi;

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


CREATE TABLE `sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseId` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sectionOrder` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sections_course` (`courseId`)
  
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  `rating` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_rating_course_user` (`userId`,`courseId`),
  KEY `fk_rating_course` (`courseId`)
  
  
  
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `paymentshistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentMethod` varchar(50) NOT NULL,
  `status` enum('pending','completed','failed','refunded') NOT NULL,
  `paymentDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_payments_course` (`courseId`),
  KEY `fk_payments_user` (`userId`)
  
  
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `payment_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `payment_method_id` int NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `status` enum('pending','approved','rejected','completed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_request_user` (`user_id`),
  KEY `fk_request_payment_method` (`payment_method_id`)
  
  
  
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `payment_methods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `bank_id` int NOT NULL,
  `account_holder_name` varchar(255) NOT NULL,
  `bank_account_number` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bank_account_number` (`bank_account_number`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `fk_payment_bank` (`bank_id`)
  
  
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `mylearning` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_MyLearning_courses` (`courseId`),
  KEY `fk_MyLearning_user` (`userId`)
  
  
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `lessons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lessonOrder` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `sectionId` int NOT NULL,
  `nameFileVideo` text,
  `courseId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_lessons_section` (`sectionId`),
  KEY `fk_Lessons_course` (`courseId`)
  
  
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `languages` (
  `language_id` int NOT NULL AUTO_INCREMENT,
  `language_code` varchar(10) NOT NULL,
  `language_name` varchar(255) NOT NULL,
  PRIMARY KEY (`language_id`),
  UNIQUE KEY `language_code` (`language_code`)
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `enrollments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  `enrolledAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_enrollments_course` (`courseId`),
  KEY `fk_enrollments_user` (`userId`)
  
  
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



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
  KEY `fk_courses_subtitles` (`subtitles`)
  
  
  
  
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 



CREATE TABLE `coursedetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseId` int NOT NULL,
  `overview` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `requirements` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `whatToLearn` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courseId` (`courseId`)
  
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `coursecategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseId` int NOT NULL,
  `categoryId` int NOT NULL,
  `categoryType` enum('lĩnh vực','chuyên ngành','phân mục') NOT NULL,
  `parentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`categoryId`),
  KEY `fk_course` (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_comments_user` (`userId`),
  KEY `fk_comments_course` (`courseId`)
  
  
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `categoriesv2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoriesV1_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_CategoriesV2_CategoriesV1` (`categoriesV1_id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `categoriesv1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `categories_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_CategoriesV1_Categories` (`categories_id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseId` int NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courseId` (`courseId`),
  KEY `fk_cart_user` (`userId`)
  
  
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `banks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameBank` text NOT NULL,
  `logo` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





-- Foreign Key Constraint
ALTER TABLE sections
ADD CONSTRAINT fk_sections_course FOREIGN KEY (courseId) REFERENCES courses (id) ON DELETE CASCADE;

ALTER TABLE rating
ADD CONSTRAINT fk_rating_course FOREIGN KEY (courseId) REFERENCES courses (id) ON DELETE CASCADE;

ALTER TABLE rating
ADD CONSTRAINT fk_rating_user FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE paymentshistory
ADD CONSTRAINT fk_payments_course FOREIGN KEY (courseId) REFERENCES courses (id);

ALTER TABLE paymentshistory
ADD CONSTRAINT fk_payments_user FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE payment_requests
ADD CONSTRAINT fk_request_payment_method FOREIGN KEY (payment_method_id) REFERENCES payment_methods (id) ON DELETE CASCADE;

ALTER TABLE payment_requests
ADD CONSTRAINT fk_request_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE payment_methods
ADD CONSTRAINT fk_payment_bank FOREIGN KEY (bank_id) REFERENCES banks (id) ON DELETE CASCADE;

ALTER TABLE payment_methods
ADD CONSTRAINT fk_payment_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE mylearning
ADD CONSTRAINT fk_MyLearning_courses FOREIGN KEY (courseId) REFERENCES courses (id);

ALTER TABLE mylearning
ADD CONSTRAINT fk_MyLearning_user FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE lessons
ADD CONSTRAINT fk_Lessons_course FOREIGN KEY (courseId) REFERENCES courses (id) ON DELETE CASCADE;

ALTER TABLE lessons
ADD CONSTRAINT fk_lessons_section FOREIGN KEY (sectionId) REFERENCES sections (id) ON DELETE CASCADE;

ALTER TABLE enrollments
ADD CONSTRAINT fk_enrollments_course FOREIGN KEY (courseId) REFERENCES courses (id) ON DELETE CASCADE;

ALTER TABLE enrollments
ADD CONSTRAINT fk_enrollments_user FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE courses
ADD CONSTRAINT fk_courses_instructor FOREIGN KEY (instructorId) REFERENCES users (id);

ALTER TABLE courses
ADD CONSTRAINT fk_courses_languages FOREIGN KEY (languages) REFERENCES languages (language_code);

ALTER TABLE courses
ADD CONSTRAINT fk_courses_subtitles FOREIGN KEY (subtitles) REFERENCES languages (language_code);

ALTER TABLE coursedetails
ADD CONSTRAINT fk_coursedetails_course FOREIGN KEY (courseId) REFERENCES courses (id) ON DELETE CASCADE;

ALTER TABLE coursecategories
ADD CONSTRAINT fk_course FOREIGN KEY (courseId) REFERENCES courses (id) ON DELETE CASCADE;

ALTER TABLE comments
ADD CONSTRAINT fk_comments_course FOREIGN KEY (courseId) REFERENCES courses (id) ON DELETE CASCADE;

ALTER TABLE comments
ADD CONSTRAINT fk_comments_user FOREIGN KEY (userId) REFERENCES users (id);

ALTER TABLE categoriesv2
ADD CONSTRAINT fk_CategoriesV2_CategoriesV1 FOREIGN KEY (categoriesV1_id) REFERENCES categoriesv1 (id);

ALTER TABLE categoriesv1
ADD CONSTRAINT fk_CategoriesV1_Categories FOREIGN KEY (categories_id) REFERENCES categories (id);

ALTER TABLE cart
ADD CONSTRAINT fk_cart_courses FOREIGN KEY (courseId) REFERENCES courses (id) ON DELETE CASCADE;

ALTER TABLE cart
ADD CONSTRAINT fk_cart_user FOREIGN KEY (userId) REFERENCES users (id);
