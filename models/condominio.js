const mongoose = require("mongoose");

const condominioSchema = new mongoose.Schema({
    nombre: String,
    admin: { type: mongoose.Schema.ObjectId, ref: "Admin" },
    directiva: [{ type: mongoose.Schema.ObjectId, ref: "Directiva" }],
    conserje: [{ type: mongoose.Schema.Types.ObjectId, ref: "Conserje" }],
    residente: [{ type: mongoose.Schema.ObjectId, ref: "Residente" }],
    libroGasto: { type: mongoose.Schema.ObjectId, ref: "LibroGasto" },
    libroEvento: { type: mongoose.Schema.ObjectId, ref: "LibroEvento" },
    espacios: [{ type: mongoose.Schema.ObjectId, ref: "Espacio" }]
});

module.exports = mongoose.model("Condominio", condominioSchema);