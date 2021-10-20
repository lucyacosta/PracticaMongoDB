const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');
const { getSolicitudes, crearSolicitud, actualizarSolicitud, eliminarSolicitud } = require('../controladores/solicitudController');

const router = Router();
router.get('/', getSolicitudes);
router.post('/', [

        check('asunto', 'El asunto de la solicitud es obligatorio').not().isEmpty(),
        check('tipo', 'El tipo de solicitud es obligatorio').not().isEmpty(),
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha de solicitud es obligatorio').not().isDate(),
        validarCampos
    ],
    crearSolicitud);

router.put('/:id', [
        validarJWT,
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('asunto', 'El asunto de la solicitud es obligatorio').not().isEmpty(),
        check('tipo', 'El tipo de solicitud es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha de solicitud es obligatorio').not().isEmpty(),

        validarCampos
    ],
    actualizarSolicitud);

router.delete('/:id',
    validarJWT,
    eliminarSolicitud);

module.exports = router;