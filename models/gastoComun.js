//TODO: #6 Completar modelo
//! Al nombrar el modelo, revisar que en server.js (en el template string) quedo nombrado como GastosComunes

const mongoose = require("mongoose");

const gastoComunSchema = new mongoose.Schema({
    tipo: String,
    vencimiento: Date,
    monto: Number,
    residente: { type: mongoose.Schema.ObjectId, ref: "residente" },
    glosa: String,
    libro: { type: mongoose.Schema.ObjectId, ref: "librogasto" }
});

module.exports = mongoose.model("GastoComun", gastoComunSchema);