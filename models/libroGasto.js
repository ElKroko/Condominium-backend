const mongoose = require("mongoose");

const libroGastoSchema = new mongoose.Schema({
    cantidad: Number,
    condominio: { type: mongoose.Schema.ObjectId, ref: "Condominio" },
    gastos: [{ type: mongoose.Schema.ObjectId, ref: "GastoComun" }]
});

module.exports = mongoose.model("LibroGasto", libroGastoSchema);