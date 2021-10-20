const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');
const { getPagos, actualizarPago, eliminarPago, crearPago } = require('../controladores/pagoController');

const router = Router();

router.get('/', getPagos);


router.post('/', [

        check('concepto', 'El concepto del pago es obligatorio').not().isEmpty(),
        check('monto', 'El monto del pago es obligatorio').not().isEmpty(),
        check('usuario', 'El usuario es obligatorio').isMongoId(),
        check('renta', 'La renta es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearPago);

router.put('/:id', [
        validarJWT,
        check('concepto', 'El concepto del pago es obligatorio').not().isEmpty(),
        check('monto', 'El monto del pago es obligatorio').not().isEmpty(),
        check('usuario', 'El usuario es obligatorio').isMongoId(),
        check('renta', 'La renta es obligatoria').not().isEmpty(),

        validarCampos
    ],
    actualizarPago);

router.delete('/:id',
    validarJWT,
    eliminarPago);



module.exports = router;