const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
    espacio: String,
    residente: String,
    pago: Number,
    fecha: Date
});

module.exports = mongoose.model("Reserva", reservaSchema);