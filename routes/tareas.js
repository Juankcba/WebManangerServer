const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth')
const {check} = require ('express-validator');

//crear una tarea 
//api/tareas

router.post('/',
    auth,
    [
        check('nombre','El Nombre es obligatorio').not().isEmpty(),
        check('proyecto','La Sala es obligatoria').not().isEmpty(),
	check('ip','La direccion de Ip es obligatoria').not().isEmpty()
    ],

    tareaController.crearTarea
);

router.get('/',
    auth,
    tareaController.obtenerTareas
);

//Actualizar Tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);

//Actualizar Tarea
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports = router;
