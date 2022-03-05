const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    orderNumber: { type: Number, unique: true },
    title: { type: String, required: true },
}, {
    timestamps: true
})

module.exports = mongoose.model("Notification", notificationSchema, 'notifications')