const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult } = require('express-validator');
const jwt  = require ('jsonwebtoken');
exports.crearUsuario = async (req, res) => {
//Chequear las validaciones
const errores = validationResult(req);
if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array()})
}

//extreaer email y password

const {email, password} = req.body;



    try {
        let usuario = await Usuario.findOne({email});
       
        if(usuario){
            return res.status(400).json({msg:'EL usuario ya existe'});
        }

         // crear usuario
         usuario = new Usuario(req.body);
         //hashear el usuario
         const salt = await bcryptjs.genSalt(10);
         usuario.password = await bcryptjs.hash(password,salt);
        //guardar usuario
        await usuario.save();

        //crear y firmar el JWT 

        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        //firmar el token

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 60 * 60, algorithm: "HS256"
        }, (error,token) => {
            if(error) throw error;
              //mensaje de confirmacion
            res.json({token});
        });

      
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}