const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
    espacio: { type: mongoose.Schema.ObjectId, ref: "espacio" },
    residente: { type: mongoose.Schema.ObjectId, ref: "residente" },
    pagado: Boolean
});

module.exports = mongoose.model("Reserva", reservaSchema);