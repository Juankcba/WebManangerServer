const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require ('express-validator');
//crear proyectos
//api/proyectos
router.post('/',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

//actualizar proyectos via ID

router.put('/:id',
auth,
[
    check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
],
proyectoController.actualizarProyecto

);

//eliminar un proyecto

router.delete('/:id',
auth,
proyectoController.eliminarProyecto

);


module.exports = router;
