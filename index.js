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
app.use(express.json());

//crear la conexion a la base de datos
dbConection();

//verificando variables de entorno
//console.log(process.env);

//creamos las rutas de mi app
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/solicitudes', require('./routes/solicitud.routes'));
app.use('/api/loginSoli', require('./routes/verSolicitud.routes'));
app.use('/api/respuesta', require('./routes/respuesta.routes'));
app.use('/api/loginRes', require('./routes/verRespuesta.routes'));
app.use('/api/pagos', require('./routes/pago.routes'));
app.use('/api/loginPago', require('./routes/verPago.routes'));
app.use('/api/facturas', require('./routes/factura.routes'));
app.use('/api/loginFactura', require('./routes/verFactura.routes'));
app.use('/api/analistas', require('./routes/analista.routes'));
app.use('/api/loginAna', require('./routes/verAnalista.routes'));


//codigo para desplegar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor Nodejs desplegado en el puerto:' + process.env.PORT)

})



//password de la BD: // PYgrfe8iHFzhWHcx
// Usuario: adminproject