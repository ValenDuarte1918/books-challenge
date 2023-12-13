function adminMiddleware(req, res, next) {
    console.log(req.session.user);
    if (req.session && req.session.userLogged.categoryId == 1) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = adminMiddleware;