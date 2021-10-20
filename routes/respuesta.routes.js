const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');
const { getRespuesta, crearRespuesta, actualizarRespuesta, eliminarRespuesta } = require('../controladores/respuestaController');

const router = Router();
router.get('/', getRespuesta);
router.post('/', [

        check('respuesta', 'La respuesta es obligatoria').not().isEmpty(),
        check('solicitud', 'La solicitud es obligatoria').not().isEmpty(),
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('detalle', 'El detalle es obligatorio').not().isEmpty(),


        validarCampos
    ],
    crearRespuesta);

router.put('/:id', [
        validarJWT,
        check('respuesta', 'La respuesta es obligatoria').not().isEmpty(),
        check('solicitud', 'La solicitud es obligatoria').not().isEmpty(),
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('detalle', 'El detalle es obligatorio').not().isEmpty(),

        validarCampos
    ],
    actualizarRespuesta);

router.delete('/:id',
    validarJWT,
    eliminarRespuesta);

module.exports = router;