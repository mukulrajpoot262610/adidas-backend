const Razorpay = require('razorpay')

class PaymentController {

    async initiatePayment(req, res) {
        let instance = new Razorpay({ key_id: process.env.RAZORPAY_ID, key_secret: process.env.RAZORPAY_SECRET })

        instance.orders.create({
            amount: 50000,
            currency: "INR",
        }, (err, order) => {
            if (err) {
                return res.status(500).json({ msg: 'Paymnent Failed' })
            } else {
                res.status(200).json({ order })
            }
        })

    }

}

module.exports = new PaymentController()