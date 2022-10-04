const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
    conserje: { type: mongoose.Schema.ObjectId, ref: "conserje" },
    glosa: String,
    libro: { type: mongoose.Schema.ObjectId, ref: "libroevento" },
    fecha: Date,
});

module.exports = mongoose.model("Evento", eventoSchema);