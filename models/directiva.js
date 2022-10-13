//TODO: #2 Completar
//! Al nombrar el modelo, revisar que en server.js (en el template string) quedo nombrado como Directiva

const mongoose = require("mongoose");

const directivaSchema = new mongoose.Schema({
    userName: String,
    pass: String,
    email: String,
    condominio: { type: mongoose.Schema.ObjectId, ref: "condominio" }
});

module.exports = mongoose.model("Directiva", directivaSchema);