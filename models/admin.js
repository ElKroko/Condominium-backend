//TODO: Completar
//! Al nombrar el modelo, revisar que en server.js (en el template string) quedo nombrado como Admin

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    userName: String,
    pass: String,
    email: String,
    condominio: { type: mongoose.Schema.ObjectId, ref: "Condominio" }
});

module.exports = mongoose.model("Admin", adminSchema);