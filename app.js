const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express()
app.use(express.static('public'));
const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

/* ESPECIFICO VIEW ENGINE Y PASO ARRAY CON PATHS DE TODOS LOS MODULOS DE VIEW */
app.set('view engine', 'ejs');
app.set('views',[
    path.join(__dirname,'views/main'),
    path.join(__dirname,'views/albums'),
    path.join(__dirname,'views/pistas'),
    path.join(__dirname,'views/partials'),
]);

/* CARGA DE LOS ROUTERS */
let mainRouter = require('./routers/mainRouter');
let albumsRouter = require('./routers/albumsRouter');
let pistasRouter = require('./routers/pistasRouter');
let cartRouter = require('./routers/cartRouter');
let usersRouter = require('./routers/usersRouter');


/* APP.USE PARA CADA ROUTER */
app.use('/', mainRouter);
app.use('/login', mainRouter);
app.use('/register', mainRouter);
app.use('/albums', albumsRouter);
app.use('/pistas', pistasRouter);
app.use('/cart', cartRouter);
app.use('/users', usersRouter);



/* SERVER EN ESCUCHA */
app.listen(3000, () => {console.log('Server en 3000 OK')});
