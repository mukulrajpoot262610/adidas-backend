const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String },
    gender: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema, 'users')