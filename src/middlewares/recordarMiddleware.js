const User = require("../database/models/User");

const rememberUser = async (req, res, next) => {
    if (req.cookies.remember && !req.session.user) {
        const user = await User.findOne({ where: { email: req.cookies.remember } });
        if (user) {
            req.session.user = user;
        }
    }
    next();
};

module.exports = rememberUser;