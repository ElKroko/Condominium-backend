const mongoose = require("mongoose");

const condominioSchema = new mongoose.Schema({
    admin: { type: mongoose.Schema.ObjectId, ref: "admin" },
    directiva: { type: mongoose.Schema.ObjectId, ref: "directiva" },
    conserje: { type: mongoose.Schema.ObjectId, ref: "conserje" }, //TODO: Hacer su modelo
    residente: { type: mongoose.Schema.ObjectId, ref: "residente" }, //TODO: Hacer su modelo
    libroEventos: { type: mongoose.Schema.ObjectId, ref: "libroEventos" }, //TODO: Hacer su modelo
    gastosComunes: { type: mongoose.Schema.ObjectId, ref: "gastosComunes" } //TODO: Hacer su modelo
});

module.exports = mongoose.model("Condominio", condominioSchema);