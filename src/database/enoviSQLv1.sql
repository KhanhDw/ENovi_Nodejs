-- Tạo cơ sở dữ liệu
CREATE DATABASE ENoviSQL;

USE ENoviSQL;


-- --------------------------------
-- VÙNG CODE ĐIÊU CHỈNH VÀ CẬP NHẬT
-- --------------------------------

SET GLOBAL time_zone = '+07:00';
SET time_zone = '+07:00';

ALTER TABLE Users MODIFY COLUMN googleId VARCHAR(255);
ALTER TABLE Courses MODIFY COLUMN level 
ENUM('beginner', 'intermediate', 'advanced', 'all') NOT NULL DEFAULT 'all';

ALTER TABLE Courses MODIFY COLUMN languages varchar(10) not null default 'vi';

ALTER TABLE Courses MODIFY COLUMN subtitles varchar(10)  null ;

ALTER TABLE Users add COLUMN biography text null;

ALTER TABLE Lessons MODIFY COLUMN content TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci null;


select languages from Courses where id > 0 ;

describe Courses;

update Courses set languages = 'vi' where id > 0;

DELETE FROM Users WHERE id = 17;

SELECT users.id FROM users WHERE id = 2;

UPDATE users SET role='admin' WHERE id = 19;

SELECT users.email,users.username,users.password,users.avatar,users.role FROM users WHERE email = 'ngothanhphong215@gmail.com';

ALTER TABLE coursedetails
DROP COLUMN targetAudience;

ALTER TABLE CategoriesV2
RENAME COLUMN subcategory_id TO categoriesV1_id;

ALTER TABLE Courses ADD COLUMN rating DECIMAL(3,2) NOT NULL DEFAULT 0.0;
ALTER TABLE Courses ADD COLUMN img text;
ALTER TABLE Courses ADD COLUMN duration varchar(10);
ALTER TABLE Courses ADD COLUMN languages nvarchar(20) NOT NULL DEFAULT 'Việt Nam';
ALTER TABLE Courses ADD COLUMN percent_discount decimal not null default 0.00 ;

ALTER TABLE Courses MODIFY COLUMN price integer not null default 0;
ALTER TABLE Courses 
ADD CONSTRAINT check_percent_discount CHECK (percent_discount BETWEEN 0 AND 100);
UPDATE courses 
SET price = FLOOR(1000 + (RAND() * (3000000 - 1000)))
where id > 0;


UPDATE Courses SET percent_discount=90 where id > 0;

select * from Courses where languages='Hàn Quốc' and title like '%python%' 	limit 10 offset 1;



  SELECT 
                    c.title AS title,
                    cd.description AS description,
                    u.username AS author,
                    c.duration AS duration,              
                    c.rating AS rate,                
                    c.price AS price,
                    c.img AS img,
                    c.languages AS languages
                FROM 
                    Courses c
                INNER JOIN 
                    Users u ON c.instructorId = u.id
                LEFT JOIN 
                    CourseDetails cd ON c.id = cd.courseId
                WHERE 
                    c.status = 'active'  and 
	languages='Hàn Quốc' and title like '%python%' 	limit 20 offset 1;


-- cơ chế bảo vệ của mysql, ngăn chặn không cho update bừa bải, cần xác định rõ nhứng nơi cần update
SET SQL_SAFE_UPDATES = 0;
UPDATE Courses SET duration = '0';
SET SQL_SAFE_UPDATES = 1;



select * from Categories;
SELECT * FROM CategoriesV1;
select * from CourseDetails;

ALTER TABLE Courses ADD FULLTEXT(title); -- TẠO CHỈ MỤC ĐỂ TRUY VẤN NHANH HƠN, ÁP DỤNG CHO DỮ LIỆU LỚN, TẬP TRUNG TÌM KIẾM THEO NGỮ NGHĨA
SELECT * FROM Courses
WHERE MATCH(title) AGAINST('Node' IN NATURAL LANGUAGE MODE)
ORDER BY createdAt DESC;

UPDATE Courses
SET img = '/imgCourse/banner.JPG'
WHERE id=4;


SELECT 
    c.id AS id,
    c.title AS title,
    cd.description AS description,
    u.username AS author,
    c.duration AS duration, 
    c.level AS level,
    c.rating AS rate,                
    c.price AS price,
    c.img AS img,
    c.languages AS languages
FROM 
    Courses c
INNER JOIN 
    Users u ON c.instructorId = u.id
LEFT JOIN 
    CourseDetails cd ON c.id = cd.courseId
WHERE 
    c.status = 'active'
    AND c.title LIKE CONCAT('%', 'Development', '%')  and c.level = 'intermediate';

select * from Users;

select * from Courses;

select * from Courses where price = 0;
select * from Courses where title like '%python%' LIMIT 20 OFFSET 1;

SET @duration_range = 1; -- Đặt giá trị cho biến
SELECT * FROM Courses
WHERE
    CASE
        WHEN @duration_range = 0 THEN duration >= 0 AND duration <= 1
        WHEN @duration_range = 1 THEN duration > 1 AND duration <= 3
        WHEN @duration_range = 2 THEN duration > 3 AND duration <= 6
        WHEN @duration_range = 3 THEN duration > 6 AND duration <= 17
        WHEN @duration_range = 4 THEN duration > 17
    END;

TRUNCATE TABLE Courses;
TRUNCATE TABLE CourseDetails;



UPDATE Courses SET  price=1 WHERE id = 63;



SELECT 
	count(c.title) as total
FROM 
    Courses c
INNER JOIN 
    Users u ON c.instructorId = u.id
LEFT JOIN 
    CourseDetails cd ON c.id = cd.courseId
WHERE 
    c.status = 'active'
    AND c.title	like '%web%';
    
    
    
UPDATE Courses
SET 
    title = CONCAT(title, ' - Updated'),
    price = ROUND(RAND() * 2),
    level = ELT(FLOOR(1 + RAND() * 4), 'beginner', 'intermediate', 'advanced', 'all'), 
    duration = FLOOR(RAND() * (1400 - 0 + 1)), 
    rating = ROUND(RAND() * (5 - 3) + 3, 1),
    img= 'banner.JPG',
    languages = ELT(FLOOR(1 + RAND() * 5), 'Việt Nam', 'Anh', 'Trung Quốc', 'Hàn Quốc', 'Nhật Bản')
Where id > 0;    




SELECT count(c.title) as total 
FROM Courses c
INNER JOIN 
	Users u ON c.instructorId = u.id
LEFT JOIN 
	CourseDetails cd ON c.id = cd.courseId
WHERE 
	c.status = 'active' AND c.title	like '%web%' ;


SELECT 
    c.id AS courseId,
    c.title,
    c.price,
    c.level,
    c.instructorId,
    c.status,
    c.createdAt
    
FROM Courses c
LEFT JOIN CourseDetails cd ON c.id = cd.courseId
WHERE c.title like '%Updated%' ORDER BY c.createdAt DESC limit 5 offset 1; 

SELECT 
	c.id AS id,
	c.title,
	c.price,
	c.level,
	c.instructorId,
	u.username AS instructorName, 
	c.status,
	c.createdAt,
	c.updatedAt,
	c.categoryId,
	c.img,
	c.duration,
	c.rating,
	c.languages,
	c.code_discount,
	c.percent_discount,
	cd.overview,
	cd.description,
	cd.requirements,
	cd.targetAudience,
	cd.whatToLearn
FROM Courses c
LEFT JOIN CourseDetails cd ON c.id = cd.courseId
LEFT JOIN Users u ON c.instructorId = u.id 
WHERE c.id = 77;


SELECT * FROM enovisql.users;

SELECT * FROM enovisql.users where role='instructor';
	
update users set role='student' where email='ngothanhphong215@gmail.com';
update Courses set instructorId=33 where id>0;


delete FROM users where email='ngothanhphong215@gmail.com';

delete FROM Courses where email='ngothanhphong215@gmail.com' and id=55;

SELECT * FROM Courses WHERE instructorId = 33;

SELECT * FROM Enrollments;


 SELECT
	c.title, 
	c.price ,
	c.rating ,
	COUNT(e.userId) AS enrollments
FROM
	Courses c
LEFT JOIN
	Enrollments e ON c.id = e.courseId
WHERE
	c.instructorId = 33
GROUP BY
	c.id, c.title, c.price, c.rating;
    
    
SELECT
	c.title ,
	c.price ,
	c.img,
	c.rating ,
	COALESCE(
		(SELECT COUNT(*) FROM Enrollments WHERE courseId = c.id),
		0
	) AS enrollments,
	COALESCE(
		(
			SELECT
				SUM(
					CASE
						WHEN MONTH(enrolledAt) = MONTH(CURRENT_DATE())
						AND YEAR(enrolledAt) = YEAR(CURRENT_DATE())
						THEN 1
						ELSE 0
					END
				)
			FROM
				Enrollments
			WHERE
				courseId = c.id
		),
		0
	) AS enrollmentsPerMonth
FROM
	Courses c
LEFT JOIN
	Enrollments e ON c.id = e.courseId
WHERE
	c.instructorId = 33 and c.title like '%'
GROUP BY
	c.id, c.title, c.price, c.rating;
    
    
SELECT * FROM Courses WHERE id = 119 and instructorId=33;

-- thêm chức xóa các khóa ngoại liên quan khi xóa dữ liệu khóa chính
ALTER TABLE enrollments DROP FOREIGN KEY fk_enrollments_course;
ALTER TABLE enrollments ADD CONSTRAINT fk_enrollments_course 
FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE;


UPDATE Courses SET updatedAt = CURRENT_TIMESTAMP WHERE id = 33 AND instructorId = 111;

  SELECT 
                c.*, 
                GROUP_CONCAT(DISTINCT cat.name SEPARATOR '; ') AS category_name, 
                GROUP_CONCAT(DISTINCT catV1.name SEPARATOR '; ') AS category_namev1, 
                GROUP_CONCAT(DISTINCT catV2.name SEPARATOR '; ') AS category_namev2
            FROM Courses c
            LEFT JOIN CourseCategories cc ON c.id = cc.courseId
            LEFT JOIN Categories cat ON cc.categoryId = cat.id
            LEFT JOIN CategoriesV1 catV1 ON cc.categoryV1Id = catV1.id
            LEFT JOIN CategoriesV2 catV2 ON cc.categoryV2Id = catV2.id
            where c.id = 111 and instructorId=33
            GROUP BY c.id;




INSERT INTO CourseCategories (courseId, categoryId, categoryV1Id, categoryV2Id)
VALUES
    (111, FLOOR(1 + (RAND() * 4)), FLOOR(1 + (RAND() * 2)), FLOOR(1 + (RAND() * 8)));

INSERT INTO CourseCategories (courseId)
VALUES
    (111);	



SELECT 
    c.*, 
    cc.courseId,
    cc.categoryId,
    cc.categoryV1Id,
    cc.categoryV2Id,
    cat.name AS category_name, 
    catV1.name AS category_namev1, 
    catV2.name AS category_namev2
FROM Courses c
LEFT JOIN CourseCategories cc ON c.id = cc.courseId
LEFT JOIN Categories cat ON cc.categoryId = cat.id
LEFT JOIN CategoriesV1 catV1 ON cc.categoryV1Id = catV1.id
LEFT JOIN CategoriesV2 catV2 ON cc.categoryV2Id = catV2.id
WHERE c.id = 111 AND instructorId=33
GROUP BY c.id, cc.courseId, cc.categoryId, cc.categoryV1Id, cc.categoryV2Id;




INSERT INTO CourseCategories (courseId, categoryId, categoryType)
VALUES (111, 4, 3, 7)  
AS new_val
ON DUPLICATE KEY UPDATE  
    categoryId = new_val.categoryId,  
    categoryV1Id = new_val.categoryV1Id,  
    categoryV2Id = new_val.categoryV2Id;


INSERT INTO CourseCategories (courseId, categoryId, categoryType)
VALUES (111, 2, '') AS new_val
ON DUPLICATE KEY UPDATE 
	courseId = new_val.courseId,
	categoryId = new_val.categoryId,  
    categoryV1Id = new_val.categoryV1Id,  
    categoryV2Id = new_val.categoryV2Id;

update CourseCategories set categoryId = 1, categoryV1Id = 1, categoryV2Id = 1
where courseId = 111 and categoryId = 3 and categoryV1Id = 1 and categoryV2Id = 7;

 truncate CourseCategories;
 
 select * from CourseCategories;
	
DELETE FROM CourseCategories WHERE courseId = 111;
 
 ALTER TABLE CourseCategories MODIFY COLUMN categoryId int null;
ALTER TABLE CourseCategories DROP PRIMARY KEY;
ALTER TABLE CourseCategories ADD PRIMARY KEY (courseId);

ALTER TABLE CourseCategories ADD COLUMN parentId int DEFAULT null ;

ALTER TABLE CourseCategories MODIFY COLUMN categoryId INT NULL;
ALTER TABLE CourseCategories MODIFY COLUMN categoryV1Id INT NULL;
ALTER TABLE CourseCategories MODIFY COLUMN categoryV2Id INT NULL;






SELECT 
    c.*, 
    cc.categoryId,
    cc.categoryType,
    cat.name AS category_name, 
    catV1.name AS categoryv1_name,
    catV2.name AS categoryv2_name,
    catParent.name AS parent_category_name,
    catV1Parent.name AS parent_category_name
FROM Courses c
LEFT JOIN CourseCategories cc ON c.id = cc.courseId
LEFT JOIN Categories cat ON cc.categoryId = cat.id AND cc.categoryType = 'lĩnh vực'
LEFT JOIN CategoriesV1 catV1 ON cc.categoryId = catV1.id AND cc.categoryType = 'chuyên ngành'
LEFT JOIN CategoriesV2 catV2 ON cc.categoryId = catV2.id AND cc.categoryType = 'phân mục'
-- Thêm join để lấy danh mục cha của CategoriesV1
LEFT JOIN Categories catParent ON catV1.categories_id = catParent.id 
-- Thêm join để lấy danh mục cha của CategoriesV2
LEFT JOIN CategoriesV1 catV1Parent ON catV2.categoriesV1_id = catV1Parent.id 
WHERE c.id = 111 AND c.instructorId = 33;



INSERT INTO CourseCategories (courseId, categoryId, categoryType) VALUES
(111, 2, 'lĩnh vực'),
(111, 3, 'chuyên ngành'),
(111, 1, 'lĩnh vực'),
(111, 4, 'phân mục'),
(111, 2, 'chuyên ngành'),
(111, 3, 'phân mục');

INSERT INTO CourseDetails (courseId, overview, description, requirements, targetAudience, whatToLearn)
VALUES (
    1, -- Thay thế 1 bằng courseId thực tế
    'Đây là phần overview của khóa học. Mô tả ngắn gọn về nội dung và mục tiêu.', -- Thay thế bằng overview thực tế
    'Đây là phần mô tả chi tiết của khóa học. Bao gồm nội dung, phương pháp giảng dạy, và các thông tin liên quan.', -- Thay thế bằng description thực tế
    'Các yêu cầu cần thiết để tham gia khóa học, ví dụ: kiến thức nền tảng, kỹ năng cần có.', -- Thay thế bằng requirements thực tế
    'Đối tượng mục tiêu của khóa học, ví dụ: người mới bắt đầu, người đã có kinh nghiệm.', -- Thay thế bằng targetAudience thực tế
    'Những gì học viên sẽ học được sau khi hoàn thành khóa học, ví dụ: kiến thức, kỹ năng.' -- Thay thế bằng whatToLearn thực tế
);

-- Ví dụ khác với courseId khác
INSERT INTO CourseDetails (courseId, overview, description, requirements, targetAudience, whatToLearn)
VALUES (
    2,
    'Khóa học nâng cao về lập trình web với React.js.',
    'Khám phá các kỹ thuật nâng cao trong React.js, bao gồm hooks, context API, và performance optimization.',
    'Yêu cầu có kiến thức cơ bản về HTML, CSS, và JavaScript, cũng như kinh nghiệm làm việc với React.js.',
    'Dành cho các lập trình viên web muốn nâng cao kỹ năng React.js.',
    'Học viên sẽ nắm vững các kỹ thuật nâng cao trong React.js, xây dựng ứng dụng web hiệu suất cao.'
);

-- Ví dụ khác nữa
INSERT INTO CourseDetails (courseId, overview, description, requirements, targetAudience, whatToLearn)
VALUES (
    111,
    'Khóa học thiết kế đồ họa cơ bản với Adobe Photoshop.',
    'Học cách sử dụng các công cụ cơ bản của Photoshop để chỉnh sửa ảnh, thiết kế banner và logo.',
    'Không yêu cầu kiến thức nền tảng về thiết kế đồ họa.',
    'Dành cho người mới bắt đầu muốn học thiết kế đồ họa.',
    'Học viên sẽ có khả năng sử dụng Photoshop để chỉnh sửa ảnh và thiết kế đồ họa cơ bản.'
);


select * from Sections;

-- ------------------------------
-- KÉT THÚC VÙNG CODE CẬP NHẬT
-- ------------------------------


-- thiếu Cart
CREATE TABLE Cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
	courseId INT NOT NULL UNIQUE,
	userId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);



-- Tạo bảng Users
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    googleId VARCHAR(255),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar text,
    role ENUM('student', 'instructor', 'admin') NOT NULL,
    website varchar(250) null,
     biography text null,
    reset_token VARCHAR(255) NULL, -- chứa token lấy lại mật khẩu
    reset_expires DATETIME NULL, -- chứa thời gian hết hạn của token lấy lại mật khẩu
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Categories
CREATE TABLE Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
);

CREATE TABLE CategoriesV1 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    categories_id INT
);

CREATE TABLE CategoriesV2 (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    categoriesV1_id INT
);


drop table CourseCategories;
DESCRIBE CourseCategories;
-- Tạo bảng trung gian để Categories và Course
CREATE TABLE CourseCategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    courseId INT  NULL,
    categoryId INT  NULL,
    parentId int DEFAULT null,
    categoryType ENUM('lĩnh vực', 'chuyên ngành', 'phân mục') NOT NULL
);


select * from Categories;
select * from CategoriesV1;
select * from CategoriesV2;
select * from CourseCategories;

select * from Courses;

update Courses set level='intermediate' where id =111;

-- Tạo bảng Courses
CREATE TABLE Courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    level ENUM('beginner', 'intermediate', 'advanced', 'all') NOT NULL DEFAULT 'all',
    instructorId INT NOT NULL,
    status ENUM('suspended', 'active', 'limited') DEFAULT 'limited', -- Nên có default cho status,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	img text, 
	duration int,
	rating DECIMAL(3,2) NOT NULL DEFAULT 0.0,
    languages int NOT NULL default 1,
	subtitles int NULL,
	code_discount varchar(40),
    percent_discount integer not null default 0
);


select * from CourseDetails;
-- Tạo bảng CourseDetails
CREATE TABLE CourseDetails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    courseId INT NOT NULL UNIQUE,
    overview TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    requirements TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    whatToLearn TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);

-- Bảng Sections (Phần/Chương)
CREATE TABLE Sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    courseId INT NOT NULL,
    title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    sectionOrder INT NOT NULL -- Thứ tự của phần trong khóa học
);

-- Bảng Lessons (Bài giảng) - Chỉnh sửa để liên kết với Sections
CREATE TABLE Lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sectionId INT NOT NULL,  -- Thay vì courseId, bây giờ liên kết với sectionId
    title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    -- content TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci, -- nội dung sẽ để bên dưới tiêu đề video trong bài giảng - xem
    videoUrl VARCHAR(255),
    lessonOrder INT NOT NULL, -- Đổi tên orderIndex thành lessonOrder cho rõ ràng
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP   
);

-- Tạo bảng CourseProgress
CREATE TABLE CourseProgress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    courseId INT NOT NULL,
    completionPercentage DECIMAL(5, 2) DEFAULT 0,
    lastAccessDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_course (userId, courseId)
);


-- Tạo bảng Comments
CREATE TABLE Comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    courseId INT,
    lessonId INT,
    content TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CHECK (courseId IS NOT NULL OR lessonId IS NOT NULL)
);

-- Tạo bảng Notifications
CREATE TABLE Notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Reviews
CREATE TABLE Reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    courseId INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Enrollments
CREATE TABLE Enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,	
    userId INT NOT NULL,
    courseId INT NOT NULL,
    enrolledAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Payments ghi lại lịch sử mua hàng của người dùng
CREATE TABLE PaymentsHistory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    courseId INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL,
    paymentDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- tạo bảng ghi chú cho người dùng
CREATE TABLE NoteOfUser (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    courseId INT NOT NULL,
    sectionId INT NOT NULL,
    lessionId INT NOT NULL,
    content Text not null,
    durationVideo VARCHAR(50) not null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng lưu lịch sử thanh toán doanh thu cho người dùng
CREATE TABLE RevenueHistory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    bankId int not null,  -- 1,2,... là số id ngân hàng
    userFullName text not null,
    phoneNumber int not null,
    transactionContent char(30) not null,
    transactionTime datetime not null
);

-- tạo bảng lưu danh sách ngân hàng
create table Banks (
    id int PRIMARY KEY AUTO_INCREMENT,
    nameBank text not null,
    logo text not null 
);

select * from Languages;
CREATE TABLE Languages (
    language_id INT PRIMARY KEY AUTO_INCREMENT,
    language_code VARCHAR(10) UNIQUE NOT NULL,
    language_name VARCHAR(255) NOT NULL
);



create table MyLearning(
	id int PRIMARY KEY AUTO_INCREMENT,
    userId int  not null,
    courseId int not null unique
);

alter table Mylearning modify column courseId int not null unique;


-- ============================Khóa======================================================


ALTER TABLE MyLearning
ADD CONSTRAINT fk_MyLearning_user FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE MyLearning
ADD CONSTRAINT fk_MyLearning_courses FOREIGN KEY (courseId) REFERENCES Courses(id);


-- Thêm các ràng buộc khóa ngoại bằng
ALTER TABLE Cart
ADD CONSTRAINT fk_cart_user FOREIGN KEY (userId) REFERENCES Users(id),
ADD CONSTRAINT fk_cart_courses FOREIGN KEY (courseId) REFERENCES Courses(id);


ALTER TABLE Courses
    ADD CONSTRAINT fk_courses_instructor FOREIGN KEY (instructorId) REFERENCES Users(id);

ALTER TABLE CourseDetails
    ADD CONSTRAINT fk_coursedetails_course FOREIGN KEY (courseId) REFERENCES Courses(id) ON DELETE CASCADE;


ALTER TABLE CourseProgress
    ADD CONSTRAINT fk_courseprogress_user FOREIGN KEY (userId) REFERENCES Users(id),
    ADD CONSTRAINT fk_courseprogress_course FOREIGN KEY (courseId) REFERENCES Courses(id);



ALTER TABLE Comments
    ADD CONSTRAINT fk_comments_user FOREIGN KEY (userId) REFERENCES Users(id),
    ADD CONSTRAINT fk_comments_course FOREIGN KEY (courseId) REFERENCES Courses(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_comments_lesson FOREIGN KEY (lessonId) REFERENCES Lessons(id) ON DELETE CASCADE;

ALTER TABLE Notifications ADD CONSTRAINT fk_notifications_user FOREIGN KEY (userId) REFERENCES Users(id);

ALTER TABLE Reviews
    ADD CONSTRAINT fk_reviews_user FOREIGN KEY (userId) REFERENCES Users(id),
    ADD CONSTRAINT fk_reviews_course FOREIGN KEY (courseId) REFERENCES Courses(id);

ALTER TABLE Enrollments
    ADD CONSTRAINT fk_enrollments_user FOREIGN KEY (userId) REFERENCES Users(id),
    ADD CONSTRAINT fk_enrollments_course FOREIGN KEY (courseId) REFERENCES Courses(id);

ALTER TABLE Payments
    ADD CONSTRAINT fk_payments_user FOREIGN KEY (userId) REFERENCES Users(id),
    ADD CONSTRAINT fk_payments_course FOREIGN KEY (courseId) REFERENCES Courses(id);


-- Thêm ràng buộc khóa ngoại cho bảng Sections
ALTER TABLE Sections ADD CONSTRAINT fk_sections_course FOREIGN KEY (courseId) REFERENCES Courses(id) ON DELETE CASCADE;

-- Thêm ràng buộc khóa ngoại cho bảng Lessons
ALTER TABLE Lessons ADD CONSTRAINT fk_lessons_section FOREIGN KEY (sectionId) REFERENCES Sections(id) ON DELETE CASCADE;



alter table NoteOfUser ADD CONSTRAINT  fk_NoteOfUser_User foreign key (userId) REFERENCES Users(id),
	 ADD CONSTRAINT  fk_NoteOfUser_Course foreign key (courseId) REFERENCES Courses(id),
	 ADD CONSTRAINT  fk_NoteOfUser_Sections foreign key (sectionId) REFERENCES Sections(id),
	 ADD CONSTRAINT  fk_NoteOfUser_Lessions foreign key (lessionId) REFERENCES Lessons(id);


alter table PaymentsHistory ADD CONSTRAINT  fk_PaymentsHistory_Users foreign key (userId) REFERENCES Users(id),
	ADD CONSTRAINT  fk_PaymentsHistory_Banks foreign key (bankId) REFERENCES Banks(id);
    
ALTER TABLE CategoriesV2 ADD CONSTRAINT fk_CategoriesV2_CategoriesV1 FOREIGN KEY (CategoriesV1_id) REFERENCES CategoriesV1(id);
ALTER TABLE CategoriesV1 ADD CONSTRAINT fk_CategoriesV1_Categories FOREIGN KEY (Categories_id) REFERENCES Categories(id);


ALTER TABLE Lessons 
ADD CONSTRAINT fk_Lessons_course FOREIGN KEY (courseId) REFERENCES Courses(id) ON DELETE CASCADE;


-- Thêm các ràng buộc FOREIGN KEY sau khi bảng CourseCategories đã được tạo
ALTER TABLE CourseCategories 
ADD CONSTRAINT fk_course FOREIGN KEY (courseId) REFERENCES Courses(id);

ALTER TABLE CourseCategories 
ADD CONSTRAINT fk_course FOREIGN KEY (courseId) REFERENCES Courses(id) ON DELETE CASCADE;


ALTER TABLE CourseCategories DROP FOREIGN KEY fk_course;


-- Xóa ràng buộc khóa ngoại từ bảng Courses------------------------------------------------------------------

ALTER TABLE Courses DROP FOREIGN KEY fk_courses_instructor;

-- Xóa ràng buộc khóa ngoại từ bảng CourseDetails
ALTER TABLE CourseDetails DROP FOREIGN KEY fk_coursedetails_course;


-- Xóa ràng buộc khóa ngoại từ bảng CourseProgress
ALTER TABLE CourseProgress DROP FOREIGN KEY fk_courseprogress_user;
ALTER TABLE CourseProgress DROP FOREIGN KEY fk_courseprogress_course;



-- Xóa ràng buộc khóa ngoại từ bảng Comments
ALTER TABLE Comments DROP FOREIGN KEY fk_comments_user;
ALTER TABLE Comments DROP FOREIGN KEY fk_comments_course;
ALTER TABLE Comments DROP FOREIGN KEY fk_comments_lesson;


-- Xóa ràng buộc khóa ngoại từ bảng Notifications
ALTER TABLE Notifications DROP FOREIGN KEY fk_notifications_user;

-- Xóa ràng buộc khóa ngoại từ bảng Reviews
ALTER TABLE Reviews DROP FOREIGN KEY fk_reviews_user;
ALTER TABLE Reviews DROP FOREIGN KEY fk_reviews_course;

-- Xóa ràng buộc khóa ngoại từ bảng Enrollments
ALTER TABLE Enrollments DROP FOREIGN KEY fk_enrollments_user;
ALTER TABLE Enrollments DROP FOREIGN KEY fk_enrollments_course;

-- Xóa ràng buộc khóa ngoại từ bảng Payments
ALTER TABLE Payments DROP FOREIGN KEY fk_payments_user;
ALTER TABLE Payments DROP FOREIGN KEY fk_payments_course;

-- Xóa ràng buộc khóa ngoại từ bảng Sections
ALTER TABLE Sections
DROP FOREIGN KEY fk_sections_course;

-- Xóa ràng buộc khóa ngoại từ bảng Lessons
ALTER TABLE Lessons
DROP FOREIGN KEY fk_lessons_section;

ALTER TABLE PaymentsHistory
DROP FOREIGN KEY fk_PaymentsHistory_Banks;
ALTER TABLE PaymentsHistory
DROP FOREIGN KEY fk_PaymentsHistory_Users;
ALTER TABLE NoteOfUser
DROP FOREIGN KEY fk_NoteOfUser_Lessions;
ALTER TABLE NoteOfUser
DROP FOREIGN KEY fk_NoteOfUser_Sections;
ALTER TABLE NoteOfUser
DROP FOREIGN KEY fk_NoteOfUser_Course;
ALTER TABLE NoteOfUser
DROP FOREIGN KEY fk_NoteOfUser_User;

ALTER TABLE cart
DROP FOREIGN KEY fk_cart_courses;
ALTER TABLE cart
DROP FOREIGN KEY fk_cart_user;

ALTER TABLE categoriesv1
DROP FOREIGN KEY fk_CategoriesV1_Categories;
ALTER TABLE categoriesv2
DROP FOREIGN KEY fk_CategoriesV2_CategoriesV1;


-- Thêm các ràng buộc FOREIGN KEY sau khi bảng CourseCategories đã được tạo

ALTER TABLE CourseCategories DROP CONSTRAINT fk_course;

ALTER TABLE CourseCategories DROP CONSTRAINT fk_category;

ALTER TABLE Lessons DROP CONSTRAINT fk_Lessons_course;

-- language and courses

select * from Courses;

ALTER TABLE Courses
ADD CONSTRAINT fk_courses_subtitles
FOREIGN KEY (subtitles) REFERENCES Languages(language_code);

ALTER TABLE Courses
ADD CONSTRAINT fk_courses_languages
FOREIGN KEY (languages) REFERENCES Languages(language_code);

-- xóa khóa language
ALTER TABLE Courses
DROP FOREIGN KEY fk_courses_languages;
ALTER TABLE Courses
DROP FOREIGN KEY fk_courses_subtitles;

ALTER TABLE MyLearning
DROP FOREIGN KEY fk_MyLearning_courses;
ALTER TABLE MyLearning
DROP FOREIGN KEY fk_MyLearning_user;

-- -----------------------------------------------------------------------------------

-- Thêm các chỉ mục (index) để tối ưu hiệu suất
CREATE INDEX idx_course_instructor ON Courses(instructorId);
CREATE INDEX idx_lesson_course ON Lessons(courseId);
CREATE INDEX idx_comment_course ON Comments(courseId);
CREATE INDEX idx_comment_lesson ON Comments(lessonId);
CREATE INDEX idx_notification_user ON Notifications(userId);
CREATE INDEX idx_enrollment_user ON Enrollments(userId);
CREATE INDEX idx_enrollment_course ON Enrollments(courseId);
CREATE INDEX idx_payment_user ON Payments(userId);
CREATE INDEX idx_payment_course ON Payments(courseId);

-- chỉ mục index tối ưu hóa hiệu xuất tìm kiếm
CREATE INDEX idx_courses_title ON Courses(title);
CREATE INDEX idx_courses_rating ON Courses(rating);
CREATE INDEX idx_courses_languages ON Courses(languages);
CREATE INDEX idx_courses_duration ON Courses(duration);
CREATE INDEX idx_courses_price ON Courses(price);



-- -------------------------------------------------------------------------------

-- Xóa các bảng theo thứ tự ngược lại với thứ tự tạo,
-- để tránh lỗi do ràng buộc khóa ngoại.

DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Enrollments;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Notifications;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS LessonProgress;
DROP TABLE IF EXISTS CourseProgress;
DROP TABLE IF EXISTS Lessons;
DROP TABLE IF EXISTS CourseDetails;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Sections;
DROP TABLE IF EXISTS NoteOfUser;
DROP TABLE IF EXISTS PaymentsHistory;
DROP TABLE IF EXISTS Banks;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS banks;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS categoriesv1;
DROP TABLE IF EXISTS categoriesv2;

-- --------------------------------------------------------------------------------

INSERT INTO Users (googleId, username, email, password, fullName, phoneNumber, role)
VALUES
    (null, 'user1', 'user1@example.com', 'hashed_password1', 'User One', '1234567890', 'student'),
    (null, 'user2', 'user2@example.com', 'hashed_password2', 'User Two', '9876543210', 'instructor'),
    (null, 'admin', 'admin@example.com', 'hashed_password3', 'Administrator', '0123456789', 'admin');
    
    
    
    
    
INSERT INTO Categories (name) VALUES
('Lập trình'),
('Thiết kế'),
('Marketing'),
('Ngoại ngữ');



INSERT INTO CategoriesV1 (name, categories_id) VALUES
('Lập trình web', 1), -- Lập trình
('Lập trình di động', 1), -- Lập trình
('Thiết kế đồ họa', 2), -- Thiết kế
('Thiết kế UI/UX', 2), -- Thiết kế
('Marketing số', 3), -- Marketing
('SEO', 3), -- Marketing
('Tiếng Anh giao tiếp', 4), -- Ngoại ngữ
('Tiếng Nhật N5', 4); -- Ngoại ngữ



INSERT INTO CategoriesV2 (name, categoriesV1_id) VALUES
('HTML/CSS cơ bản', 1), -- Lập trình web
('JavaScript nâng cao', 1), -- Lập trình web
('React Native cho người mới', 2), -- Lập trình di động
('Swift cho iOS', 2), -- Lập trình di động
('Photoshop từ A-Z', 3), -- Thiết kế đồ họa
('Illustrator chuyên sâu', 3), -- Thiết kế đồ họa
('Thiết kế wireframe', 4), -- Thiết kế UI/UX
('Thiết kế prototype', 4), -- Thiết kế UI/UX
('Facebook Ads cơ bản', 5), -- Marketing số
('Google Ads nâng cao', 5), -- Marketing số
('On-page SEO', 6), -- SEO
('Off-page SEO', 6), -- SEO
('Tiếng Anh giao tiếp hàng ngày', 7), -- Tiếng Anh giao tiếp
('Luyện thi JLPT N5', 8); -- Tiếng Nhật N5




INSERT INTO Users (googleId, username, email, password, avatar, role, reset_token, reset_expires) VALUES
('123456789012345678901', 'john_doe', 'john.doe@example.com', 'hashed_password_1', 'avatar1.jpg', 'student', NULL, NULL),
('123456789012345678902', 'jane_smith', 'jane.smith@example.com', 'hashed_password_2', 'avatar2.jpg', 'instructor', NULL, NULL),
('123456789012345678903', 'admin_user', 'admin@example.com', 'hashed_password_3', 'avatar3.jpg', 'admin', NULL, NULL),
('123456789012345678904', 'student1', 'student1@example.com', 'hashed_password_4', 'avatar4.jpg', 'student', NULL, NULL),
('123456789012345678905', 'instructor1', 'instructor1@example.com', 'hashed_password_5', 'avatar5.jpg', 'instructor', NULL, NULL),
('123456789012345678906', 'student2', 'student2@example.com', 'hashed_password_6', 'avatar6.jpg', 'student', NULL, NULL),
('123456789012345678907', 'instructor2', 'instructor2@example.com', 'hashed_password_7', 'avatar7.jpg', 'instructor', NULL, NULL),
('123456789012345678908', 'student3', 'student3@example.com', 'hashed_password_8', 'avatar8.jpg', 'student', NULL, NULL),
('123456789012345678909', 'instructor3', 'instructor3@example.com', 'hashed_password_9', 'avatar9.jpg', 'instructor', NULL, NULL),
('123456789012345678910', 'student4', 'student4@example.com', 'hashed_password_10', 'avatar10.jpg', 'student', NULL, NULL),
(NULL, 'user11', 'user11@example.com', 'hashed_password_11', 'avatar11.jpg', 'student', 'reset_token_1', '2024-12-31 23:59:59'),
(NULL, 'user12', 'user12@example.com', 'hashed_password_12', 'avatar12.jpg', 'instructor', NULL, NULL),
(NULL, 'user13', 'user13@example.com', 'hashed_password_13', 'avatar13.jpg', 'student', NULL, NULL),
(NULL, 'user14', 'user14@example.com', 'hashed_password_14', 'avatar14.jpg', 'instructor', 'reset_token_2', '2024-12-25 12:00:00'),
(NULL, 'user15', 'user15@example.com', 'hashed_password_15', 'avatar15.jpg', 'student', NULL, NULL),
(NULL, 'user16', 'user16@example.com', 'hashed_password_16', 'avatar16.jpg', 'instructor', NULL, NULL),
(NULL, 'user17', 'user17@example.com', 'hashed_password_17', 'avatar17.jpg', 'student', NULL, NULL),
(NULL, 'user18', 'user18@example.com', 'hashed_password_18', 'avatar18.jpg', 'instructor', NULL, NULL),
(NULL, 'user19', 'user19@example.com', 'hashed_password_19', 'avatar19.jpg', 'student', NULL, NULL),
(NULL, 'user20', 'user20@example.com', 'hashed_password_20', 'avatar20.jpg', 'instructor', NULL, NULL);

-- Dữ liệu mẫu cho bảng Courses (categoryId từ 1-4)
INSERT INTO Courses (title, price, level, instructorId, status, categoryId) VALUES
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Advanced Java Programming', 149.99, 'advanced', 5, 'active', 2),
('Web Development with React', 129.99, 'intermediate', 7, 'active', 3),
('Data Science Fundamentals', 119.99, 'beginner', 9, 'active', 4),
('Mobile App D	evelopment', 139.99, 'intermediate', 12, 'active', 1),
('Machine Learning Basics', 159.99, 'advanced', 14, 'active', 4),
('UI/UX Design', 89.99, 'beginner', 16, 'active', 3),
('Cloud Computing Essentials', 109.99, 'intermediate', 18, 'active', 2),
('Game Development with Unity', 169.99, 'advanced', 20, 'active', 1),
('Digital Marketing Strategy', 79.99, 'beginner', 2, 'active', 4),
('Python for Data Analysis', 100.00, 'intermediate',5,'limited',2),
('Fullstack Web Dev', 150.00, 'advanced',7,'active',3),
('Intro to C++', 80.00, 'beginner',9,'active',1),
('CyberSecurity Basics', 90.00, 'beginner',12,'active',4),
('Advanced JavaScript', 130.00, 'intermediate',14,'active',3),
('SQL Database Design', 110.00, 'intermediate',16,'active',2),
('AI and Deep Learning', 170.00, 'advanced',18,'active',4),
('Graphic Design 101', 75.00, 'beginner',20,'active',1),
('Project Management', 95.00, 'intermediate',5,'active',2),
('Ethical Hacking', 145.00, 'advanced',7,'active',3);

-- Dữ liệu mẫu cho bảng CourseDetails (requirements: kiến thức nền tảng cần có)
INSERT INTO CourseDetails (courseId, overview, description, requirements, targetAudience, whatToLearn) VALUES
(61, 'Learn the basics of Python programming.', 'This course covers fundamental Python concepts.', 'No prior programming experience needed.', 'Beginners interested in Python.', 'Python syntax, data types, and basic programming.'),
(62, 'Master advanced Java programming techniques.', 'Deep dive into advanced Java topics.', 'Basic Java knowledge required.', 'Experienced Java developers.', 'Advanced Java concepts, design patterns, and best practices.'),
(63, 'Build modern web applications with React.', 'Learn to create interactive UIs using React.', 'Basic HTML, CSS, and JavaScript knowledge.', 'Web developers interested in React.', 'React components, state management, and routing.'),
(64, 'Introduction to data science concepts.', 'Learn the basics of data science and analysis.', 'Basic understanding of statistics.', 'Anyone interested in data science.', 'Data analysis, visualization, and machine learning basics.'),
(65, 'Develop mobile apps for iOS and Android.', 'Learn to build cross-platform mobile apps.', 'Basic programming knowledge.', 'Aspiring mobile app developers.', 'Mobile app development using frameworks like React Native.'),
(66, 'Introduction to machine learning algorithms.', 'Learn the fundamentals of machine learning.', 'Basic understanding of mathematics and statistics.', 'Anyone interested in machine learning.', 'Machine learning algorithms, model training, and evaluation.'),
(67, 'Learn the principles of UI/UX design.', 'Create user-friendly interfaces.', 'No prior design experience needed.', 'Aspiring UI/UX designers.', 'UI/UX design principles, wireframing, and prototyping.'),
(68, 'Explore cloud computing concepts.', 'Learn about cloud services and infrastructure.', 'Basic IT knowledge.', 'Anyone interested in cloud computing.', 'Cloud computing models, services, and deployment.'),
(69, 'Create 3D games with Unity.', 'Learn game development using Unity.', 'Basic programming knowledge.', 'Aspiring game developers.', 'Unity engine, game mechanics, and 3D modeling.'),
(70, 'Learn digital marketing strategies.', 'Develop effective marketing campaigns.', 'No prior marketing experience needed.', 'Anyone interested in digital marketing.', 'Digital marketing channels, SEO, and social media marketing.'),
(71, 'Thực hành phân tích dữ liệu với Python', 'Sử dụng các thư viện như Pandas, NumPy để phân tích dữ liệu.', 'Kiến thức cơ bản về Python và thống kê.', 'Người muốn làm việc với dữ liệu.', 'Phân tích dữ liệu, xử lý dữ liệu và trực quan hóa dữ liệu với Python.'),
(72, 'Xây dựng ứng dụng web Fullstack', 'Xây dựng ứng dụng web hoàn chỉnh từ frontend đến backend.', 'Kiến thức về HTML, CSS, JavaScript và một ngôn ngữ backend (Node.js, Python...).', 'Người muốn trở thành Fullstack Developer.', 'Xây dựng API, làm việc với database và triển khai ứng dụng web.'),
(73, 'Lập trình C++ từ cơ bản', 'Học lập trình C++ từ những khái niệm cơ bản nhất.', 'Không cần kiến thức lập trình trước.', 'Người mới bắt đầu học lập trình C++.', 'Cấu trúc dữ liệu, thuật toán và lập trình hướng đối tượng với C++.'),
(74, 'Bảo mật mạng cơ bản', 'Tìm hiểu về các khái niệm cơ bản về bảo mật mạng.', 'Kiến thức cơ bản về mạng máy tính.', 'Người muốn làm việc trong lĩnh vực bảo mật mạng.', 'Các mối đe dọa bảo mật, phương pháp phòng chống và kiểm tra bảo mật.'),
(75, 'Lập trình JavaScript nâng cao', 'Nâng cao kỹ năng lập trình JavaScript với các khái niệm nâng cao.', 'Kiến thức vững chắc về JavaScript cơ bản.', 'Người muốn trở thành chuyên gia JavaScript.', 'Asynchronous programming, design patterns và tối ưu hóa hiệu năng JavaScript.'),
(76, 'Thiết kế cơ sở dữ liệu SQL', 'Thiết kế cơ sở dữ liệu quan hệ với SQL.', 'Kiến thức cơ bản về cơ sở dữ liệu.', 'Người muốn làm việc với cơ sở dữ liệu SQL.', 'Thiết kế bảng, truy vấn dữ liệu và tối ưu hóa hiệu năng cơ sở dữ liệu.'),
(77, 'Trí tuệ nhân tạo và học sâu', 'Tìm hiểu về các thuật toán và mô hình học sâu.', 'Kiến thức về toán cao cấp và lập trình Python.', 'Người muốn làm việc trong lĩnh vực trí tuệ nhân tạo.', 'Mạng nơ-ron, học sâu và các ứng dụng của trí tuệ nhân tạo.'),
(78, 'Thiết kế đồ họa cơ bản', 'Học các nguyên tắc thiết kế đồ họa cơ bản.', 'Không cần kinh nghiệm thiết kế trước.', 'Người muốn học thiết kế đồ họa.', 'Các công cụ thiết kế, nguyên tắc thiết kế và tạo ra các sản phẩm đồ họa đơn giản.'),
(79, 'Quản lý dự án chuyên nghiệp', 'Học các phương pháp quản lý dự án hiệu quả.', 'Không yêu cầu kiến thức chuyên môn.', 'Người muốn làm việc trong lĩnh vực quản lý dự án.', 'Lập kế hoạch dự án, quản lý rủi ro và giao tiếp trong dự án.'),
(80, 'Kiểm thử xâm nhập đạo đức', 'Thực hành các kỹ thuật kiểm thử xâm nhập để đánh giá bảo mật hệ thống.', 'Kiến thức về mạng máy tính và bảo mật.', 'Người muốn trở thành chuyên gia bảo mật mạng.', 'Các công cụ và kỹ thuật kiểm thử xâm nhập, báo cáo và khắc phục lỗ hổng bảo mật.');



UPDATE Courses SET img = 'course61.jpg', rating = 4.5, duration = FLOOR(RAND() * 36) WHERE id = 61;
UPDATE Courses SET img = 'course62.png', rating = 4.2, duration = FLOOR(RAND() * 36) WHERE id = 62;
UPDATE Courses SET img = 'course63.jpeg', rating = 4.8, duration = FLOOR(RAND() * 36) WHERE id = 63;
UPDATE Courses SET img = 'course64.gif', rating = 3.9, duration = FLOOR(RAND() * 36) WHERE id = 64;
UPDATE Courses SET img = 'course65.jpg', rating = 4.6, duration = FLOOR(RAND() * 36) WHERE id = 65;
UPDATE Courses SET img = 'course66.png', rating = 4.3, duration = FLOOR(RAND() * 36) WHERE id = 66;
UPDATE Courses SET img = 'course67.jpeg', rating = 4.9, duration = FLOOR(RAND() * 36) WHERE id = 67;
UPDATE Courses SET img = 'course68.gif', rating = 3.8, duration = FLOOR(RAND() * 36) WHERE id = 68;
UPDATE Courses SET img = 'course69.jpg', rating = 4.7, duration = FLOOR(RAND() * 36) WHERE id = 69;
UPDATE Courses SET img = 'course70.png', rating = 4.1, duration = FLOOR(RAND() * 36) WHERE id = 70;
UPDATE Courses SET img = 'course71.jpeg', rating = 4.4, duration = FLOOR(RAND() * 36) WHERE id = 71;
UPDATE Courses SET img = 'course72.gif', rating = 3.7, duration = FLOOR(RAND() * 36) WHERE id = 72;
UPDATE Courses SET img = 'course73.jpg', rating = 4.0, duration = FLOOR(RAND() * 36) WHERE id = 73;
UPDATE Courses SET img = 'course74.png', rating = 4.5, duration = FLOOR(RAND() * 36) WHERE id = 74;
UPDATE Courses SET img = 'course75.jpeg', rating = 4.2, duration = FLOOR(RAND() * 36) WHERE id = 75;
UPDATE Courses SET img = 'course76.gif', rating = 4.8, duration = FLOOR(RAND() * 36) WHERE id = 76;
UPDATE Courses SET img = 'course77.jpg', rating = 3.9, duration = FLOOR(RAND() * 36) WHERE id = 77;
UPDATE Courses SET img = 'course78.png', rating = 4.6, duration = FLOOR(RAND() * 36) WHERE id = 78;
UPDATE Courses SET img = 'course79.jpeg', rating = 4.3, duration = FLOOR(RAND() * 36) WHERE id = 79;
UPDATE Courses SET img = 'course80.gif', rating = 4.9, duration = FLOOR(RAND() * 36) WHERE id = 80;


UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 61;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 62;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 63;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 64;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 65;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 66;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 67;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 68;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 69;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 70;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 71;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 72;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 73;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 74;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 75;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 76;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 77;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 78;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 79;
UPDATE Courses SET  duration = FLOOR(RAND() * 1060) WHERE id = 80;


UPDATE Courses SET img = 'banner.JPG' WHERE id = 61;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 62;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 63;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 64;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 65;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 66;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 67;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 68;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 69;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 70;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 71;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 72;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 73;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 74;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 75;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 76;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 77;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 78;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 79;
UPDATE Courses SET img = 'banner.JPG' WHERE id = 80;

INSERT INTO Courses (title, price, level, instructorId, status, categoryId) VALUES
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1),
('Introduction to Python', 99.99, 'beginner', 2, 'active', 1);

select * from Enrollments;

INSERT INTO Enrollments (userId, courseId, paidAmount, status)
VALUES 
(33, 64, 100.00, 'active'),
(33, 65, 100.00, 'active'),
(33, 66, 100.00, 'active'),
(33, 67, 100.00, 'active'),
(33, 68, 100.00, 'active'),
(33, 69, 100.00, 'active'),
(33, 70, 100.00, 'active'),
(33, 71, 100.00, 'active'),
(33, 72, 100.00, 'active'),
(33, 73, 100.00, 'active'),
(33, 74, 100.00, 'active'),
(33, 75, 100.00, 'active'),
(33, 76, 100.00, 'active'),
(33, 77, 100.00, 'active'),
(33, 78, 100.00, 'active'),
(33, 79, 100.00, 'active'),
(33, 80, 100.00, 'active'),
(33, 81, 100.00, 'active'),
(33, 82, 100.00, 'active'),
(33, 83, 100.00, 'active'),
(33, 84, 100.00, 'active'),
(33, 85, 100.00, 'active'),
(33, 86, 100.00, 'active'),
(33, 87, 100.00, 'active'),
(33, 88, 100.00, 'active'),
(33, 89, 100.00, 'active'),
(33, 90, 100.00, 'active'),
(33, 91, 100.00, 'active'),
(33, 92, 100.00, 'active'),
(33, 93, 100.00, 'active'),
(33, 94, 100.00, 'active'),
(33, 95, 100.00, 'active'),
(33, 96, 100.00, 'active'),
(33, 97, 100.00, 'active'),
(33, 98, 100.00, 'active'),
(33, 99, 100.00, 'active'),
(33, 100, 100.00, 'active'),
(33, 101, 100.00, 'active'),
(33, 102, 100.00, 'active'),
(33, 103, 100.00, 'active'),
(33, 104, 100.00, 'active'),
(33, 105, 100.00, 'active'),
(33, 106, 100.00, 'active'),
(33, 107, 100.00, 'active'),
(33, 108, 100.00, 'active'),
(33, 109, 100.00, 'active'),
(33, 110, 100.00, 'active'),
(33, 111, 100.00, 'active'),
(33, 112, 100.00, 'active'),
(33, 113, 100.00, 'active'),
(33, 114, 100.00, 'active'),
(33, 115, 100.00, 'active'),
(33, 116, 100.00, 'active'),
(33, 117, 100.00, 'active'),
(33, 118, 100.00, 'active'),
(33, 119, 100.00, 'active'),
(33, 120, 100.00, 'active');

INSERT INTO Enrollments (userId, courseId, paidAmount, status, enrolledAt)
VALUES
    (33, 64, 100.00, 'active', '2023-11-15 10:30:00'),
    (33, 65, 100.00, 'active', '2023-11-16 14:45:00'),
    (33, 66, 100.00, 'active', '2023-11-17 09:15:00');

INSERT INTO Enrollments (userId, courseId, paidAmount, status, enrolledAt)
VALUES
    (33, 64, 100.00, 'active', DATE_SUB(NOW(), INTERVAL 1 DAY)), -- 1 ngày trước
    (33, 65, 100.00, 'active', DATE_ADD(NOW(), INTERVAL 1 HOUR)), -- 1 giờ sau
    (33, 66, 100.00, 'active', DATE_SUB(NOW(), INTERVAL 1 WEEK)); -- 1 tuần trước


DELETE FROM Languages WHERE language_id > 0;

INSERT INTO Languages (language_code, language_name)
VALUES
    ('en', 'English'),
    ('vi', 'Tiếng Việt'),
    ('fr', 'Français'),
    ('es', 'Español'),
    ('zh', '中文'),
    ('ar', 'العربية'),
    ('ru', 'Русский'),
    ('ja', '日本語'),
    ('de', 'Deutsch'),
    ('pt', 'Português'),
    ('hi', 'हिन्दी'),
    ('it', 'Italiano'),
    ('ko', '한국어'),
    ('tr', 'Türkçe'),
    ('id', 'Bahasa Indonesia'),
    ('nl', 'Nederlands'),
    ('sv', 'Svenska'),
    ('pl', 'Polski'),
    ('th', 'ภาษาไทย'),
    ('uk', 'Українська');

INSERT INTO enovisql.cart (courseId, userId, createdAt)
VALUES 
(62, 33, NOW()),
(63, 33, NOW()),
(64, 33, NOW()),
(65, 33, NOW()),
(66, 33, NOW()),
(67, 33, NOW()),
(68, 33, NOW()),
(69, 33, NOW()),
(70, 33, NOW()),
(71, 33, NOW()),
(72, 33, NOW()),
(73, 33, NOW()),
(74, 33, NOW()),
(75, 33, NOW());





select * from Sections;
select * from  Lessons;

alter table Lessons modify column courseId int not null default 0;

update Lessons set courseId = 111 where id >0;



select count(sectionId) as count from Lessons where sectionId=9;

INSERT INTO Sections (courseId, title, sectionOrder) VALUES
(111, 'Cấu trúc điều khiển', 1),
(111, 'Cấu trúc lập trình cơ bản', 2),
(111, 'Cấu trúc điều khiển', 3);



UPDATE lessons SET videoUrl=null WHERE id = 5;


DELETE FROM Sections WHERE courseId = 111 and sectionOrder = 4;


ALTER TABLE Lessons
DROP COLUMN durationVideo;

INSERT INTO Lessons (title, videoUrl, lessonOrder, sectionId) 
VALUES 
( 'Giới thiệu khóa học',  'video1.mp4', 1, 9),
('Cách học hiệu quả',  'video2.mp4', 2, 9);

ALTER TABLE Lessons rename COLUMN sectionId to sectionOrder;
ALTER TABLE Lessons Drop COLUMN CourseId;
ALTER TABLE Lessons Add COLUMN nameFileVideo text null;

truncate  Lessons;


SELECT * FROM users WHERE username LIKE '%thanh phong%' OR email LIKE '%thanh phong%'  OR role LIKE '%thanh phong%';


INSERT INTO MyLearning (userId, courseId)
VALUES 
    (33, 62), (33, 63), (33, 64), (33, 65), (33, 66), (33, 67), (33, 68), (33, 69), (33, 70),
    (33, 71), (33, 72), (33, 73), (33, 74), (33, 75), (33, 76), (33, 77), (33, 78), (33, 79), (33, 80),
    (33, 81), (33, 82), (33, 83), (33, 84), (33, 85), (33, 86), (33, 87), (33, 88), (33, 89), (33, 90),
    (33, 91), (33, 92), (33, 93), (33, 94), (33, 95), (33, 96), (33, 97), (33, 98), (33, 99), (33, 100);

	







