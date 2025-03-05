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
        return await executeQuery("SELECT id FROM Categories where name=?;", [name]);
    }
    static async getCaterogiesV1IdByName(name) {
        return await executeQuery("SELECT id FROM CategoriesV1 where name=?;", [name]);
    }
    static async getCaterogiesV2IdByName(name) {
        return await executeQuery("SELECT id FROM CategoriesV2 where name=?;", [name]);
    }
}

module.exports = CategoriesModel;
