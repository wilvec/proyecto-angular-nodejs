var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargar archivos de rutas

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var project_routes = require('./routes/project');

//CORS

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas

app.use('/api',project_routes);
/*
app.get('/', (req,res) => {
    res.status(200).send(
        "<h1>Página de inicio</h1>"
    );
});

app.post('/test', (req,res) => {
    console.log(req.body['nombres']);
    console.log(req.body['apellidos']);
    console.log(req.query['web']);
    res.status(200).send({
        message: "Hola Mundo desde mi API de NodeJS!"
    });
});
*/

/*
app.get('/test', (req,res) => {
    console.log(req.params('nombres'));
    res.status(200).send({
        message: "Hola Mundo desde mi API de NodeJS!"
    });
});

app.get('/test/:id/:name', (req,res) => {
    console.log(req.params);
    res.status(200).send({
        message: "Hola Mundo desde mi API de NodeJS!"
    });
});
*/

//exportar
module.exports = app;