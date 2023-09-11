function albumMiddleware(req, res, next) {
    console.log('pasando por albumMiddleware');
    if (req.session.user == undefined) {
        res.render('album-error-whitout-access');
        return
    } 
    next();
}

module.exports = albumMiddleware;