const userService = require("../services/user-service")
const orderService = require("../services/order-service")

class OrderController {
    async placeOrder(req, res) {
        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body

        if (!orderItems || !shippingAddress || !paymentMethod || !totalPrice) {
            return res.status(400).json({ msg: 'All Field are required' })
        }

        const userId = req.user._id

        try {
            const user = await userService.findUser({ _id: userId })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            const order = await orderService.createOrder({
                orderItems,
                shippingAddress,
                paymentMethod,
                totalPrice,
                userId: userId
            })

            user.orders = [order._id, ...user.orders]

            await user.save()

            res.status(200).json({ order, user })

        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: "Internal Server Error" })
        }
    }
}

module.exports = new OrderController()