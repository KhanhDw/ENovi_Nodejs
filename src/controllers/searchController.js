const searchEnovi = async (req, res) => {
    try {
        const searchQuery = req.query.search_query;
        res.send(searchQuery);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    searchEnovi,
};
