const mongoose = require("mongoose");

const espacioSchema = new mongoose.Schema({
    nombre: String,
    cantidad: Number,
    reservados: Number
});

module.exports = mongoose.model("Espacio", espacioSchema);