const { Router } = require('express');
const { loginPago } = require('../controladores/login.Pago');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.post('/', [
        check('concepto', 'El concepto del pago es obligatorio').not().isEmpty(),
        check('monto', 'El monto del pago es obligatorio').not().isEmpty(),

        validarCampos
    ],
    loginPago
);

module.exports = router;