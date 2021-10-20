const { response } = require("express");
const bcrypt = require('bcryptjs');
const Analista = require('../models/analistaModel');
const { generarJWT } = require('../helpers/jwt')

const loginAna = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        //Verificar al analista por su email
        const analistaDB = await Analista.findOne({ email });
        if (!analistaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
                    //considerar la utilizacion de este mensaje
            });
        }
        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, analistaDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }
        //Generar el TOKEN-JWT
        const token = await generarJWT(analistaDB.id);

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
    loginAna
}