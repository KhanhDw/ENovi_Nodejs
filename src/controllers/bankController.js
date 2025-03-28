const Bank = require("../models/bankModel");

function getAllBanks(req, res) {
    Bank.getAllBanks()
        .then(banks => {
            res.status(200).json(banks);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
}

module.exports = {
    getAllBanks
};
