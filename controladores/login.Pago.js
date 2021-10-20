const { response } = require("express");
const bcrypt = require('bcryptjs');
const Pago = require('../models/pagoModel');
const { generarJWT } = require('../helpers/jwt')

const loginPago = async(req, res = response) => {
    const { concepto, monto } = req.body;
    try {
        //Verificar concepto de pago
        const pagoDB = await Pago.findOne({ concepto });
        if (!pagoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Pago no encontrado'
                    //considerar la utilizacion de este mensaje
            });
        }
        //verificar monto
        const validMonto = bcrypt.compareSync(monto, pagoDB.monto);
        if (!validMonto) {
            return res.status(400).json({
                ok: false,
                msg: 'Monto no valido'
            });
        }

        //Generar el TOKEN-JWT
        const token = await generarJWT(pagoDB.id);

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
    loginPago
}