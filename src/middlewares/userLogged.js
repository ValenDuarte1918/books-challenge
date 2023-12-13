function userLogged(req, res, next) {
res.locals.isLogged = false;

if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
   if (req.session.userLogged.categoryId == 1) res.locals.admin = true
   else res.locals.admin = false
}

next();
}

module.exports = userLogged;