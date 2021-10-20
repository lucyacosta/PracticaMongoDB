/*
    path:/api/loginSoli
*/

const { Router } = require('express');
const { loginSoli } = require('../controladores/login.Solicitudes');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.post('/', [
        check('usuario', 'El usuario es obligatorio').isMongoId(),
        check('asunto', 'El asunto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginSoli
);

module.exports = router;