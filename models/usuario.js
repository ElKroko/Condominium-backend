// Para definir en mongo db cual es la estructura que tendra y ocmo se va a guardar


const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: String,
    pass: String,
    nombre: String
})

module.exports = mongoose.model('Usuario', usuarioSchema) 