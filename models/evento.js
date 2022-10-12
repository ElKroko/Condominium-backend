const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
    conserje: { type: mongoose.Schema.ObjectId, ref: "Conserje" },
    glosa: String,
    libro: { type: mongoose.Schema.ObjectId, ref: "LibroEvento" }
});

module.exports = mongoose.model("Evento", eventoSchema);