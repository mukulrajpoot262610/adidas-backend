const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderItems: [
        {
            product: {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                name: { type: String },
                thumbnail: { type: String },
                price: { type: String },
                salePrice: { type: String }
            },
            qty: { type: Number, default: 1 },
            size: { type: Number },
        }
    ],
    shippingAddress: {
        street: { type: String },
        landmark: { type: String },
        state: { type: String },
        city: { type: String },
        pinCode: { type: String },
        country: { type: String }
    },
    paymentMethod: { type: String },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    taxPrice: { type: Number, default: 0.0 },
    shippingPrice: { type: Number, default: 0.0 },
    totalPrice: { type: Number, default: 0.0 },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    status: { type: String, default: 'Shipped' },
}, {
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema, 'orders')