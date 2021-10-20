const { response } = require('express');
const Respuesta = require('../models/respuestaModel');

const getRespuesta = async(req, res = response) => {
    const respuesta = await Respuesta.find().populate('usuario', 'respuesta detalle solicitud');


    res.json({
        ok: true,
        respuesta
    });
}
const crearRespuesta = async(req, res = response) => {
    const uid = req.uid;

    const respuesta = new Respuesta({
        usuario: uid,
        ...req.body
    });

    try {

        const AmadorDB = await Respuesta.save();
        res.json({
            ok: true,
            respuesta: AmadorDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarRespuesta = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const respuesta = await Respuesta.findById(id);
        if (!respuesta) {
            return res.status(404).json({
                ok: true,
                msg: 'Respuesta no existe'

            });
        }

        const cambiosRespuesta = {
            ...req.body,
            usuario: uid
        }

        const respuestaActualizada = await Respuesta.findByIdAndUpdate(id, cambiosRespuesta, { new: true });

        return res.json({
            ok: true,
            respuesta: respuestaActualizada

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarRespuesta = async(req, res = response) => {
    const id = req.params.id;
    try {
        const respuesta = await Respuesta.findById(id);
        if (!respuesta) {
            return res.status(404).json({
                ok: true,
                msg: 'Respuesta no existe'

            });
        }

        await Respuesta.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Respuesta Eliminada'

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
    getRespuesta,
    crearRespuesta,
    actualizarRespuesta,
    eliminarRespuesta
}