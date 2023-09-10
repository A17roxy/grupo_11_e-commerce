function rememberMiddleware(req, res, next) {
    
    if (req.cookies.remember != undefined && req.session.user == undefined) {
        console.log('Cookie encontrada: ');
        req.session.user = req.cookies.remember;
    }
    next();
}
module.exports = rememberMiddleware;