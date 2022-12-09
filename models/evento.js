const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
    tipo: String,
    glosa: String,
    fecha: Date,
    responsable: String,
    info_adicional: {
        type: String, 
        default: "Evento sin detalles adicionales."
    }
});

module.exports = mongoose.model("Evento", eventoSchema);