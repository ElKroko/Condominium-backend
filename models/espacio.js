const mongoose = require("mongoose");

const espacioSchema = new mongoose.Schema({
    nombre: String,
    reserva: { type: mongoose.Schema.ObjectId, ref: "Reserva" },
    reservado: Boolean
});

module.exports = mongoose.model("Espacio", espacioSchema);