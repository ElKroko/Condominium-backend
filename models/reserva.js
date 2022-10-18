const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
    espacio: { type: mongoose.Schema.ObjectId, ref: "Espacio" },
    residente: { type: mongoose.Schema.ObjectId, ref: "Residente" },
    pagado: Boolean,
    fecha: Date
});

module.exports = mongoose.model("Reserva", reservaSchema);