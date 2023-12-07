const db = require('../database/models/User');
const adminMiddleware = (req, res, next) => {
    if (!req.session.userLogged || req.session.user.categoryId !== 'admin') {
        return res.redirect('/users/login');
    }
    next();
};

module.exports = adminMiddleware;