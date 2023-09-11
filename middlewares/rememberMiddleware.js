function rememberMiddleware(req, res, next) {
    console.log('pasando por rememberMiddleware');
    if (req.cookies.remember != undefined && req.session.user == undefined) {
        console.log('Cookie encontrada: ');
        req.session.user = req.cookies.remember;
    }
    next();
}
module.exports = rememberMiddleware;