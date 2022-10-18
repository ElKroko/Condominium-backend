const mongoose = require("mongoose");

const espacioSchema = new mongoose.Schema({
    nombre: String,
    reservado: Boolean,
    reservas: [{ type: mongoose.Schema.ObjectId, ref: "Reserva" }],
    condominio: { type: mongoose.Schema.ObjectId, ref: "Condominio" }
});

module.exports = mongoose.model("Espacio", espacioSchema);