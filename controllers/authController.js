const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult } = require('express-validator');
const jwt  = require ('jsonwebtoken');
const { findById } = require('../models/Usuario');

exports.autenticarUsuario = async (req, res) => {

    //Chequear las validaciones
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer usuario y password
    const{ email, password} = req.body;
    try {
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'});
        }
        // Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:'El password es incorrecto'});
        }
        // si esta todo correcto

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
    }
}

//obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req,res) =>{
    try {
        const usuario =  await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}