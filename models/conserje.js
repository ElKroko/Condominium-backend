//TODO: #3 Completar
//! Al nombrar el modelo, revisar que en server.js (en el template string) quedo nombrado como Conserje

const mongoose = require("mongoose");

const conserjeSchema = new mongoose.Schema({
    userName: String,
    pass: String,
    email: String,
    condominio: { type: mongoose.Schema.ObjectId, ref: "condominio" }
});

module.exports = mongoose.model("Conserje", conserjeSchema);