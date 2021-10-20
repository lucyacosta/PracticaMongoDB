const { response } = require('express');
const Factura = require('../models/facturaModel');
const getFactura = async(req, res = response) => {

    const factura = await Factura.find().populate('usuario', 'pagoTotal fecha pago detalle');
    res.json({
        ok: true,
        factura
    });
}
const crearFactura = async(req, res = response) => {
    const uid = req.uid;

    const facturas = new Factura({
        usuario: uid,
        ...req.body
    });

    try {
        const AmadorDB = await facturas.save();
        res.json({
            ok: true,
            factura: AmadorDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarFactura = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const factura = await Factura.findById(id);
        if (!factura) {
            return res.status(404).json({
                ok: true,
                msg: 'Factura no existe'

            });
        }

        const cambiosFactura = {
            ...req.body,
            usuario: uid
        }

        const facturaActualizada = await Factura.findByIdAndUpdate(id, cambiosFactura, { new: true });

        return res.json({
            ok: true,
            factura: facturaActualizada

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarFactura = async(req, res = response) => {
    const id = req.params.id;

    try {

        const factura = await Factura.findById(id);
        if (!factura) {
            return res.status(404).json({
                ok: true,
                msg: 'Factura no existe'

            });
        }

        await Factura.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Factura Eliminada'

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
module.exports = {
    getFactura,
    crearFactura,
    actualizarFactura,
    eliminarFactura
}