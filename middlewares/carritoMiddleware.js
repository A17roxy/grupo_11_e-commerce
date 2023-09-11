function carritoMiddleware(req, res, next) {
        console.log('pasando por carritoMiddleware');
        if (req.session.user == undefined) {
            res.render('cart-error-whitout-access');
            return
        } 
        next();
    }
    
    module.exports = carritoMiddleware;