require("dotenv").config();
const { executeQuery } = require("../config/query");

class LanguagesModel {
    static async getLanguages() {
        return await executeQuery(
            `select 
                language_code,
                language_name
            from Languages;`
        );
    }
}   

module.exports = LanguagesModel;
