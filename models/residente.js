//TODO: #4 Completar modelo
//! Al nombrar el modelo, revisar que en server.js (en el template string) quedo nombrado como Residente

const mongoose = require("mongoose");

const residenteSchema = new mongoose.Schema({
    userName: String,
    pass: String,
    email: String,
    deuda: Number,
    condominio: { type: mongoose.Schema.ObjectId, ref: "Condominio" },
    reservas: [{ type: mongoose.Schema.ObjectId, ref: "Reserva" }]

});

module.exports = mongoose.model("Residente", residenteSchema);