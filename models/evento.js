const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
    tipo: String,
    glosa: String,
    fecha: Date,
    responsable: String
});

module.exports = mongoose.model("Evento", eventoSchema);