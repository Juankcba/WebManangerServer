const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        ip: {
            type: String,
            required: true,
            trim: true
        },
        vol: {
            type: Number,
            default: 50
        },
        mic: {
            type: Number,
            default: 50
        },
        estado: {
            type:Boolean,
            default:false
        },
        creado: {
            type: Date,
            default:Date.now()
        },
        proyecto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Proyecto'
        }
    }
);

module.exports = mongoose.model('Tarea',TareaSchema);