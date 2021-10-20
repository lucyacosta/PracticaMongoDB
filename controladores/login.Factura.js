const { response } = require("express");
const bcrypt = require('bcryptjs');
const Factura = require('../models/facturaModel');
const { generarJWT } = require('../helpers/jwt')

const loginFactura = async(req, res = response) => {
    const { usuario, pagoTotal } = req.body;
    try {
        //Verificar factura
        const facturaDB = await Factura.findOne({ usuario });
        if (!facturaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Factura no encontrada'
                    //considerar la utilizacion de este mensaje
            });
        }
        //verificar pagoTotal
        const validPagoTotal = bcrypt.compareSync(pagoTotal, facturaDB.pagoTotal);
        if (!validPagoTotal) {
            return res.status(400).json({
                ok: false,
                msg: 'Monto Total no valido'
            });
        }
        //Generar el TOKEN-JWT
        const token = await generarJWT(facturaDB.id);

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
    loginFactura
}