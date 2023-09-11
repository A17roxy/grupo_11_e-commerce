function carritoMiddleware(req, res, next) {
        console.log('pasando por carritoMiddleware');
        if (req.session.user == undefined) {
            res.send("NO PODES ENTRAR AL CARRITO SIN LOGUEARTE");
            return
        } 
        next();
    }
    
    module.exports = carritoMiddleware;