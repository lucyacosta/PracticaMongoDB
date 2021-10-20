const { response } = require('express');
const bcrypt = require('bcryptjs');
const Analista = require('../models/analistaModel');

const getAnalista = async(req, res) => {
    //const usuarios = await Usuario.find();
    const analista = await Analista.find({}, 'nombre email role google');
    res.json({
        ok: true,
        analista

    });
}
const crearAnalista = async(req, res = response) => {

    //console.log(req.body);
    const { email, password, nombre } = req.body;
    try {
        const existeEmail = await Analista.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya ha sido registrado'
            });
        }

        //creamos un objeto de la clase model Usuario
        const analista = new Analista(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        analista.password = bcrypt.hashSync(password, salt);
        //indicamos a mongoose que registre al usuario en la bd
        await analista.save();

        res.json({
            ok: true,
            analista
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}
const actualizarAnalista = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const analistaDB = await Analista.findById(uid);
        if (!analistaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //codigo previo a la actualizacion
        const { password, google, email, ...campos } = req.body;
        if (analistaDB.email !== email) {
            const existeEmail = await Analista.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                });

            }
        }

        campos.email = email;

        //actualizacion de datos
        const analistaActualizado = await Analista.findByIdAndUpdate(uid,
            campos, { new: true });

        res.json({
            ok: true,
            analista: analistaActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}
const eliminarAnalista = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const analistaDB = await Analista.findById(uid);
        if (!analistaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un analista con ese id'
            });
        }
        await Analista.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Analista eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar al analista'
        });
    }
}

module.exports = {
    getAnalista,
    crearAnalista,
    actualizarAnalista,
    eliminarAnalista
}