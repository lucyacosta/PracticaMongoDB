const { response } = require("express");
const bcrypt = require('bcryptjs');
const Respuesta = require('../models/respuestaModel');
const { generarJWT } = require('../helpers/jwt')

const loginRes = async(req, res = response) => {
    const { respuesta } = req.body;
    try {

        //Verificar la respuesta
        const respuestaDB = await Respuesta.findOne({ respuesta });
        if (!respuestaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Respuesta no encontrada'
                    //considerar la utilizacion de este mensaje
            });
        }
        //verificar solicitud
        /*const validSolicitud = bcrypt.compareSync(solicitud, respuestaDB);
        if (!validSolicitud) {
            return res.status(400).json({
                ok: false,
                msg: 'Solicitud no valida'
            });
        }*/

        //Generar el TOKEN-JWT
        const token = await generarJWT(respuestaDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
module.exports = {
    loginRes
}