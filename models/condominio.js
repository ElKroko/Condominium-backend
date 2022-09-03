const mongoose = require("mongoose");

const condominioSchema = new mongoose.Schema({
    admin: { type: mongoose.Schema.ObjectId, ref: "admin" },
    directiva: [{ type: mongoose.Schema.ObjectId, ref: "directiva" }],
    conserje: [{ type: mongoose.Schema.ObjectId, ref: "conserje" }],
    residente: [{ type: mongoose.Schema.ObjectId, ref: "residente" }],
    libroEvento: [{ type: mongoose.Schema.ObjectId, ref: "libroEvento" }],
    gastosComunes: [{ type: mongoose.Schema.ObjectId, ref: "gastosComunes" }]
});

module.exports = mongoose.model("Condominio", condominioSchema);