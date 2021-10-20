const { response } = require("express");
const bcrypt = require('bcryptjs');
const Solicitud = require('../models/solicitudModel');
const { generarJWT } = require('../helpers/jwt')
const loginSoli = async(req, res = response) => {
    const { usuario, asunto } = req.body;

    try {
        //Verificar a la solicitud por usuario
        const solicitudDB = await Solicitud.findOne({ usuario });
        if (!solicitudDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
                    //considerar la utilizacion de este mensaje
            });
        }
        //verificar asunto
        const validAsunto = await Solicitud.findOne({ asunto });
        if (!validAsunto) {
            return res.status(400).json({
                ok: false,
                msg: 'Asunto no valido'
            });
        }

        //Generar el TOKEN-JWT
        const token = await generarJWT(solicitudDB.id);

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
    loginSoli
}