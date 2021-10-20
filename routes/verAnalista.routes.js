const { Router } = require('express');
const { loginAna } = require('../controladores/login.Analista')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginAna
);

module.exports = router;