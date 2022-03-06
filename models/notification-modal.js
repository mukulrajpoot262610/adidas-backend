const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    orderNumber: { type: String },
    title: { type: String, required: true },
}, {
    timestamps: true
})

module.exports = mongoose.model("Notification", notificationSchema, 'notifications')