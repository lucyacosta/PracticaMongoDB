/*
    path:/api/loginRes
*/

const { Router } = require('express');
const { loginRes } = require('../controladores/login.Respuesta');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.post('/', [
        check('respuesta', ' La respuesta es obligatoria').not().isEmpty(),
        //check('solicitud', 'la solicitud es obligatoria').not().isMongoId(),
        validarCampos
    ],
    loginRes
);

module.exports = router;