const LanguagesModel = require("../models/languages");


const getLanguages = async (req, res) => {
    try {
        const getlistLanguages = await LanguagesModel.getLanguages();

        console.log("getlistLanguages:"+getlistLanguages);

        return res.json({success: true, listLanguages: getlistLanguages})
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
};

module.exports = {
    getLanguages,
};
