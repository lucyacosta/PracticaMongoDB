const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getAnalista, crearAnalista, actualizarAnalista, eliminarAnalista } = require('../controladores/analistaController');
const { validarJWT } = require('../helpers/jwt');


const router = Router();

router.get('/', validarJWT, getAnalista);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearAnalista);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        //check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarAnalista);

router.delete('/:id', validarJWT, eliminarAnalista);

module.exports = router;