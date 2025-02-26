const CategoriesModel = require("../models/categoriesModel");

const getCategories = async (req, res) => {
    try {
        const categories = await CategoriesModel.getCaterogies();
        const categoriesV1 = await CategoriesModel.getCaterogiesV1();
        const categoriesV2 = await CategoriesModel.getCaterogiesV2();

        // // Chuyển đổi dữ liệu thành cấu trúc lồng nhau
        // const buildTree = (categories, categoriesV1, categoriesV2) => {
        //     // Bước 1: Gán categoriesV2 vào categoriesV1
        //     if (Array.isArray(categoriesV1) && Array.isArray(categoriesV2)) {
        //         categoriesV1.forEach((v1) => {
        //             v1.subitems = categoriesV2
        //                 .filter((v2) => v2.categoriesV1_id === v1.id)
        //                 .map((v2) => v2.name);
        //         });
        //     }

        //     // Bước 2: Gán categoriesV1 vào categories
        //     if (Array.isArray(categories)) {
        //         categories.forEach((cat) => {
        //             cat.subfields = categoriesV1
        //                 .filter((v1) => v1.categories_id === cat.id)
        //                 .map((v1) => ({
        //                     name: v1.name,
        //                     subitems: v1.subitems || [],
        //                 }));
        //         });
        //     }

        //     return categories.map((cat) => ({
        //         name: cat.name,
        //         subfields: cat.subfields || [],
        //     }));
        // };

        // // Xây dựng cấu trúc JSON
        // const formattedCategories = buildTree(
       console.log(     categories.length,
            categoriesV1.length,
            categoriesV2.length
        );

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
