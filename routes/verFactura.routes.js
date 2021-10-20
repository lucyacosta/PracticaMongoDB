const { Router } = require('express');
const { loginFactura } = require('../controladores/login.Factura');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.post('/', [

        check('usuario', 'El usuario es obligatorio').isMongoId(),
        check('pagoTotal', 'El dato de pagoTotal es obligatorio').not().isEmpty(),

        validarCampos
    ],
    loginFactura
);

module.exports = router;