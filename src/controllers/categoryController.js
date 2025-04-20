const CategoriesModel = require("../models/categoriesModel");

const getCategories = async (req, res) => {
    try {
        const categories = await CategoriesModel.getCaterogies();
        const categoriesV1 = await CategoriesModel.getCaterogiesV1();
        const categoriesV2 = await CategoriesModel.getCaterogiesV2();

        // console.log(
        //     categories.length,
        //     categoriesV1.length,
        //     categoriesV2.length
        // );

        res.json({
            success: true,
            message: "Lấy dữ liệu thành công",
            categories: categories,
            categoriesV1: categoriesV1,
            categoriesV2: categoriesV2,
        });
    } catch (error) {
        console.error("Lỗi lấy lĩnh vực, nodejs:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi lấy lĩnh vực, nodejs:",
        });
    }
};
const getCategoriesV1 = async (req, res) => {
    try {
        const { id } = req.query;
        const categoriesV1 =
            await CategoriesModel.getCaterogiesV1Bycategories_id(id);
        res.json({
            success: true,
            message: "Lấy dữ liệu thành công",
            categoriesV1: categoriesV1,
        });
    } catch (error) {
        console.error("Lỗi lấy lĩnh vực, nodejs:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi lấy lĩnh vực, nodejs:",
        });
    }
};
const getCategoriesV2 = async (req, res) => {
    try {
        const { idv1 } = req.query;
        const categoriesV2 =
            await CategoriesModel.getCaterogiesV2Bycategories_id(idv1);
        res.json({
            success: true,
            message: "Lấy dữ liệu thành công",
            categoriesV2: categoriesV2,
        });
    } catch (error) {
        console.error("Lỗi lấy lĩnh vực, nodejs:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi lấy lĩnh vực, nodejs:",
        });
    }
};

const createCategories = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(decodeURIComponent(name));
        await CategoriesModel.createCaterogies(name);
        res.json({
            success: true,
            message: "tạo category thành công",
        });
    } catch (error) {
        console.error("Lỗi lấy lĩnh vực, nodejs:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi lấy lĩnh vực, nodejs:",
        });
    }
};
const createCategoriesv1 = async (req, res) => {
    try {
        const { name, idLinhVuc } = req.body;
        console.log(decodeURIComponent(name));
        await CategoriesModel.createCaterogiesv1(name, idLinhVuc);
        res.json({
            success: true,
            message: "tạo categoryv1 thành công",
        });
    } catch (error) {
        console.error("Lỗi lấy lĩnh vực, nodejs:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi lấy lĩnh vực, nodejs:",
        });
    }
};
const createCategoriesv2 = async (req, res) => {
    try {
        const { name, idChuyenNganh } = req.body;
        console.log(decodeURIComponent(name));
        await CategoriesModel.createCaterogiesv2(name, idChuyenNganh);
        res.json({
            success: true,
            message: "tạo categoryv2 thành công",
        });
    } catch (error) {
        console.error("Lỗi lấy lĩnh vực, nodejs:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi lấy lĩnh vực, nodejs:",
        });
    }
};

const deleteCategories = async (req, res) => {
    try {
        const { id } = req.query;
        console.log(decodeURIComponent(id));
        await CategoriesModel.deleteCaterogies(id);
        res.json({
            success: true,
            message: "delete category thành công",
        });
    } catch (error) {
        console.error("Lỗi lấy lĩnh vực, nodejs:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi lấy lĩnh vực, nodejs:",
        });
    }
};
const deleteCategoriesv1 = async (req, res) => {
    try {
        const { id } = req.query;
        await CategoriesModel.deleteCaterogiesv1(id);
        res.json({
            success: true,
            message: "delete categoryv1 thành công",
        });
    } catch (error) {
        console.error("Lỗi lấy lĩnh vực, nodejs:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi lấy lĩnh vực, nodejs:",
        });
    }
};
const deleteCategoriesv2 = async (req, res) => {
    try {
        const { id } = req.query;
        await CategoriesModel.deleteCaterogiesv2(id);
        res.json({
            success: true,
            message: "delete categoryv2 thành công",
        });
    } catch (error) {
        console.error("Lỗi lấy lĩnh vực, nodejs:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi lấy lĩnh vực, nodejs:",
        });
    }
};

const getCourseCategories = async (req, res) => {
    try {
        const { courseId } = req.query;
        const courseCategories = await CategoriesModel.getCourseCategories(
            courseId
        );
        res.json({
            success: true,
            message: "Lấy dữ liệu thành công",
            courseCategories: courseCategories,
        });
    } catch (error) {
        console.error("Lỗi lấy lĩnh vực khóa học, nodejs:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi lấy lĩnh vực khóa học, nodejs:",
        });
    }
};
const getCourseCategoriesTest = async (req, res) => {
    try {
        const { courseId } = req.query;
        const courseCategories = await CategoriesModel.getCourseCategoriesTest(
            courseId
        );
        res.json({
            success: true,
            message: "Lấy dữ liệu thành công",
            courseCategories: courseCategories,
        });
    } catch (error) {
        console.error("Lỗi lấy lĩnh vực khóa học, nodejs:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi lấy lĩnh vực khóa học, nodejs:",
        });
    }
};

module.exports = {
    getCategories,
    getCategoriesV1,
    getCategoriesV2,
    createCategories,
    createCategoriesv1,
    createCategoriesv2,
    deleteCategories,
    deleteCategoriesv1,
    deleteCategoriesv2,
    getCourseCategories,
    getCourseCategoriesTest,
};
