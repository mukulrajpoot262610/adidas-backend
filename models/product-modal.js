const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    name: { type: String },
    rating: { type: String },
    comment: { type: String }
},
    { timestamps: true }
)

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    desc: { type: String, required: true },
    subname: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, default: 0.0 },
    salePrice: { type: Number, default: 0.0 },
    thumbnail: { type: String },
    image: { type: String },
    specification: [{ type: String }],
    importer: { type: String },
    quantity: { type: Number, default: 0 },
    gender: { type: String },
    country: { type: String },
    ratings: { type: Number, default: 0.0 },
    numOfReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
},
    { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)