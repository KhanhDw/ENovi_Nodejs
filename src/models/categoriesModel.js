require("dotenv").config();
const { executeQuery } = require("../config/query");

class CategoriesModel {
    static async getCaterogies() {
        return await executeQuery("SELECT * FROM Categories");
    }
    static async getCaterogiesV1() {
        return await executeQuery("SELECT * FROM CategoriesV1");
    }
    static async getCaterogiesV2() {
        return await executeQuery("SELECT * FROM CategoriesV2");
    }
    static async getCaterogiesIdByName(name) {
        return await executeQuery("SELECT id FROM Categories where name=?;", [
            name,
        ]);
    }
    static async getCaterogiesV1IdByName(name) {
        return await executeQuery("SELECT id FROM CategoriesV1 where name=?;", [
            name,
        ]);
    }
    static async getCaterogiesV2IdByName(name) {
        return await executeQuery("SELECT id FROM CategoriesV2 where name=?;", [
            name,
        ]);
    }

    static async getCaterogiesV1Bycategories_id(id) {
        return await executeQuery(
            "SELECT * FROM CategoriesV1 where categories_id=?;",
            [id]
        );
    }
    static async getCaterogiesV2Bycategories_id(id) {
        return await executeQuery(
            "SELECT * FROM CategoriesV2 where categoriesV1_id=?;",
            [id]
        );
    }

    static async createCaterogies(name) {
        return await executeQuery(`INSERT INTO Categories (name) VALUES (?);`, [
            name,
        ]);
    }
    static async createCaterogiesv1(name, categories_id) {
        return await executeQuery(
            `INSERT INTO Categoriesv1 (name, categories_id) VALUES (?, ?);`,
            [name, categories_id]
        );
    }
    static async createCaterogiesv2(name, categoriesV1_id) {
        return await executeQuery(
            `INSERT INTO Categoriesv2 (name, categoriesV1_id) VALUES (?, ?);`,
            [name, categoriesV1_id]
        );
    }

    static async deleteCaterogies(id) {
        return await executeQuery(`delete from Categories where id=?;`, [id]);
    }
    static async deleteCaterogiesv1(id) {
        return await executeQuery(`delete from Categoriesv1 where id=?;`, [id]);
    }
    static async deleteCaterogiesv2(id) {
        console.log("deleteCaterogiesv2:" + id);
        return await executeQuery(`delete from Categoriesv2 where id=?;`, [id]);
    }

    static async getCourseCategories() {
        const query = `
            SELECT 
                CC.id AS courseCategoryId,
                C.name AS category_name,
                CV1.name AS categoryV1_name,
                CV2.name AS categoryV2_name
            FROM CourseCategories CC
            LEFT JOIN Categories C ON CC.categoryId = C.id
            LEFT JOIN CategoriesV1 CV1 ON CC.categoryId = CV1.id
            LEFT JOIN CategoriesV2 CV2 ON CC.categoryId = CV2.id;
        `;
        return await executeQuery(query);
    }

    static async getCourseCategoriesTest(courseId) {
        console.log("courseId:", courseId);

        const query = `
            SELECT
                CC.courseId,
                GROUP_CONCAT(CASE WHEN CC.categoryType = 'lĩnh vực' THEN C.name END) AS linh_vuc,
                GROUP_CONCAT(CASE WHEN CC.categoryType = 'chuyên ngành' THEN CV1.name END) AS chuyen_nganh,
                GROUP_CONCAT(CASE WHEN CC.categoryType = 'phân mục' THEN CV2.name END) AS phan_muc
            FROM CourseCategories CC
            LEFT JOIN Categories C ON CC.categoryId = C.id AND CC.categoryType = 'lĩnh vực'
            LEFT JOIN CategoriesV1 CV1 ON CC.categoryId = CV1.id AND CC.categoryType = 'chuyên ngành'
            LEFT JOIN CategoriesV2 CV2 ON CC.categoryId = CV2.id AND CC.categoryType = 'phân mục'
            WHERE CC.courseId = ?
            GROUP BY CC.courseId;
                    `;
        return await executeQuery(query, [courseId]);
    }
}

module.exports = CategoriesModel;
