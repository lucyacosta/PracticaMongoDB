const jwt = require('jsonwebtoken');

//Funcion que genera un JWT
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            //se puede agregar informacion adicional
        };

        //JWT_SECRET es la firma que utilizara el servidor para generar JWT
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => { //callback
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
}

const validarJWT = (req, res, next) => {

    //Leer el Token del header
    //x-token es un header personalizado donde se registrara un token valido
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    generarJWT,
    validarJWT
}