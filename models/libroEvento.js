//TODO: #5 Completar modelo
//! Al nombrar el modelo, revisar que en server.js (en el template string) quedo nombrado como Libro

const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
    cantidad: Number,
    condominio: { type: mongoose.Schema.ObjectId, ref: "Condominio" },
    eventos: [{ type: mongoose.Schema.ObjectId, ref: "Evento" }]
});

module.exports = mongoose.model("LibroEvento", eventoSchema);