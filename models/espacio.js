const mongoose = require("mongoose");

const espacioSchema = new mongoose.Schema({
    nombre: String,
    reserva: { type: mongoose.Schema.ObjectId, ref: "reserva" },
    reservado: Boolean
});

module.exports = mongoose.model("Espacio", espacioSchema);