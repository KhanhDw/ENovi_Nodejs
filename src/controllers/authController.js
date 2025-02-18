const homelo = async (req, res) => {
    res.send("hello");
};

const loginGoole = async (req, res) => {
    res.send('<a href="/auth/google">Login with google</a>');
};

module.exports = {
    homelo,
    loginGoole,
};
