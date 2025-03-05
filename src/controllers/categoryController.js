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

module.exports = {
    getCategories,
};
