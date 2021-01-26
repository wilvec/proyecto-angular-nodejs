'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port=3700;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
.then(() => {
    console.log("Conexión a la bd establecida de manera exitosa!");
    app.listen(port, ()=>{
        console.log("Servidor corriendo exitósamente en la dirección localhost:3700");

    });

})
.catch(err => console.log(err));