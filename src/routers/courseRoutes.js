const express = require("express");
const courseController = require("../controllers/courseController");
const courseDetailController = require("../controllers/courseDetailController");
// const sectonRouter = require("../routers/sectionRoutes");
const sectionController = require("../controllers/sectionsController");
const LessionController = require("../controllers/LessionController");

const router = express.Router();

// Định nghĩa các route cho Course

// ✅ tạo mới khóa học (POST - create new course)
router.post("/create", courseController.createCourse);

// tạo mới lesson (POST create new lesson)
router.post("/lesson/create", LessionController.createLession);

// ✅ Xóa sectoion theo courseID (DELETE - xóa dữ liệu)
router.post("/:courseId/section/create", sectionController.createSection);

// ✅ Cập nhật video giới thiệu khóa học (PUT - cập nhật một phần)
router.put("/:courseId/update/intro-video", courseController.updateIntroVideo);

// ✅ Cập nhật khóa học của giảng viên (PUT - cập nhật một phần)
router.put(
    "/section/:sectionId/lession/update/title",
    LessionController.updateLessonTitle
);

// ✅ Cập nhật video bài giảng khóa học của giảng viên (PUT - cập nhật một phần)
router.put(
    "/section/:sectionId/lession/:lessonId/update/name-video",
    LessionController.updateLessonNameVideo
);

// ✅ Cập nhật khóa học của giảng viên (PUT - cập nhật một phần)
router.put(
    "/:idCourse/instructor/:instructorId",
    courseController.putUpdateCourseInstructor
);

// ✅ Cập nhật category khóa học của giảng viên (PUT - cập nhật một phần)
router.put(
    "/:courseId/update/category",
    courseController.putUpdateCategoryCourse
);

// ✅ Câp nhật sections theo courseID (PUT - cập nhật một phần)
router.put(
    "/:courseId/section/:sectionOrder/update-name",
    sectionController.updateNameSection
);

// ✅ Xóa khóa học theo instructorId (DELETE - xóa dữ liệu)
router.delete(
    "/instructor/delete-course/:idCourse",
    courseController.deleteCourseByInstructorID
);

// ✅ Xóa sectoion theo courseID (DELETE - xóa dữ liệu)
router.delete(
    "/:courseId/section/:sectionOrder/delete",
    sectionController.deleteSection
);

// ✅ Xóa sectoion theo courseID (DELETE - xóa dữ liệu)
router.delete("/lesson/:lessonId/delete", LessionController.deleteLession);

// ✅ Lấy thông tin thanh toán khóa học theo courseId (POST - đọc dữ liệu) ////
router.get("/course/payment", courseController.getCoursePaymentById);

// ✅ Tìm kiếm khóa học theo tiêu đề của giảng viên (GET - tìm kiếm)
router.get(
    "/instructor/search",
    courseController.getSearchCourseInstructorByTitle
);

// ✅ Lấy danh sách khóa học miễn phí được đánh giá cao (GET - danh sách)
router.get("/top-rated/free", courseController.getTopRatedFreeCourses);


// ✅ Lấy danh sách khóa học được đánh giá cao (GET - danh sách)
router.get("/top-rated", courseController.getTopRatedCourses);


// ✅ lấy lession từ Section theo sectionID (Get - list )
router.get("/section/:sectionId/lession", LessionController.getLession);

// ✅ lấy sections theo courseID (GET - danh sách section)
router.get("/:courseId/section/get", sectionController.getSection);

// ✅ lấy sections theo courseID (GET - danh sách section)
router.get(
    "/:courseId/section/:sectionOrder/get",
    sectionController.getSectionId
);

// ✅ Lấy danh sách khóa học theo instructorId (GET - danh sách)
router.get("/instructor/:id", courseController.getListCourseByInstructorID);

// ✅ Lấy chi tiết khóa học theo title (GET - chi tiết khóa học)
router.get("/:id/title/:title", courseDetailController.getCourseDetailByTitle);

// ✅ Lấy thông tin khóa học theo ID (GET - đọc dữ liệu)
router.get("/:idCourse/:instructorId", courseController.getCourseById);

// ✅ Lấy tổng số khóa học của giảng viên theo instructorId (GET - đếm tổng)
router.get("/instructor/:instructorId/total-courses", courseController.getCountCoursesByInstructor);



// router.get("/price/:price", courseController.getCourseByPrice); // GET /api/courses/price/:price
// router.get("/level/:level", courseController.getCourseByLevel); // GET /api/courses/level/:level
// router.get("/category/:categoryName", courseController.getCourseByCategory); // GET /api/courses/category/:categoryName
// router.get("/category/v1/:categoryName", courseController.getCourseByCategoryV1); // GET /api/courses/category/v1/:categoryName
// router.get("/category/v2/:categoryName", courseController.getCourseByCategoryV2); // GET /api/courses/category/v2/:categoryName

module.exports = router;
