function rememberMiddleware(req, res, next) {

    if (req.cookies.remember != undefined && req.session.loggedFirstName == undefined) {
        console.log('Cookie encontrada: '+req.cookies.remeber);
        req.session.loggedFirstName = req.cookies.remeber;
    }
    next();
}
module.exports = rememberMiddleware;