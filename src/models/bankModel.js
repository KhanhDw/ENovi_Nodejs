require("dotenv").config();
const { executeQuery } = require("../config/query");


// Function to fetch all banks
async function getAllBanks() {
    const banks = await executeQuery("SELECT * FROM banks");
    return banks;
}

module.exports = {
    getAllBanks
};
