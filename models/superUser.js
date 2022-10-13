const mongoose = require("mongoose");

const superUserSchema = new mongoose.Schema({
    userName: String,
    pass: String,
    email: String,
});

module.exports = mongoose.model("SuperUser", superUserSchema);