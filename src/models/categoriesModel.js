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
}

module.exports = CategoriesModel;
