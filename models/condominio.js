const mongoose = require("mongoose");

const condominioSchema = new mongoose.Schema({
    nombre: String,
    admin: { type: mongoose.Schema.ObjectId, ref: "admin" },
    directiva: [{ type: mongoose.Schema.ObjectId, ref: "directiva" }],
    conserjes: [{ type: mongoose.Schema.Types.ObjectId, ref: "conserje" }],
    residente: [{ type: mongoose.Schema.ObjectId, ref: "residente" }],
    libroGasto: { type: mongoose.Schema.ObjectId, ref: "librogasto" },
    libroEvento: { type: mongoose.Schema.ObjectId, ref: "libroevento" },
    espacios: [{ type: mongoose.Schema.ObjectId, ref: "espacio" }]
});

module.exports = mongoose.model("Condominio", condominioSchema);