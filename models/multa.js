const mongoose = require("mongoose");

const multaSchema = new mongoose.Schema({
    residente: { type: mongoose.Schema.ObjectId, ref: "residente" },
    fecha: Date,
    monto: Number,
    comentario: String
});

module.exports = mongoose.model("Multa", multaSchema);