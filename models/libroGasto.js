const mongoose = require("mongoose");

const libroGastoSchema = new mongoose.Schema({
    cantidad: Number,
    condominio: { type: mongoose.Schema.ObjectId, ref: "condominio" },
    gastos: [{ type: mongoose.Schema.ObjectId, ref: "gastocomun" }]
});

module.exports = mongoose.model("LibroGasto", libroGastoSchema);