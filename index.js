//Con este codigo o sintaxis se importa todo el modulo expres en nodejs
const express = require('express');
require('dotenv').config();
const { dbConection } = require('./config/database');
const cors = require('cors');

//creamos el servidor express
const app = express();

//los cors deben estar despues del express
//Estableciendo configuracion de cors
app.use(cors());

//crear la conexion a la base de datos
dbConection();

//verificando variables de entorno
//console.log(process.env);

//creamos las rutas de mi app
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Bienvenidos a la App proyectos'
    });
})

//codigo para desplegar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor Nodejs desplegado en el puerto:' + process.env.PORT)
})



//password de la BD: // PYgrfe8iHFzhWHcx
// Usuario: adminproject