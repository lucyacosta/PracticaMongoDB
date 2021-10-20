const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');
const { getFactura, actualizarFactura, eliminarFactura, crearFactura } = require('../controladores/facturaController');

const router = Router();
router.get('/', getFactura);

router.post('/', [

        check('usuario', 'El usuario es obligatorio').isMongoId(),
        check('pagoTotal', 'El dato de pagoTotal es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es obligatoria').not().isEmpty(),
        check('pago', 'El pago es obligatorio').not().isEmpty(),
        check('detalle', 'El detalle del pago es obligatorio').not().isEmpty(),

        validarCampos
    ],
    crearFactura);

router.put('/:id', [
        validarJWT,
        check('usuario', 'El usuario es obligatorio').isMongoId(),
        check('pagoTotal', 'El dato de pagoTotal es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es obligatoria').not().isEmpty(),
        check('pago', 'El pago es obligatorio').not().isEmpty(),
        check('detalle', 'El detalle del pago es obligatorio').not().isEmpty(),

        validarCampos
    ],
    actualizarFactura);

router.delete('/:id',
    validarJWT,
    eliminarFactura);



module.exports = router;