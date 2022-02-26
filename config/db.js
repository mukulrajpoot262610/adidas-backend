const mongoose = require('mongoose')

const connectDB = async () => {

    try {
        const response = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        if (response) { console.log('MongoDB connected...') }
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB