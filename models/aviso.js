const mongoose = require("mongoose");

const avisoSchema = new mongoose.Schema({
    titulo: String,
    creador: String,
    descripcion: String,
    fecha: Date
});

module.exports = mongoose.model("Aviso", avisoSchema);