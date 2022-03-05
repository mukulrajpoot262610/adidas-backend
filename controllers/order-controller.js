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

    async getAllOrders(req, res) {

        try {
            const userId = req.user._id
            const user = await userService.findUser({ _id: userId })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            if (!user.isAdmin) {
                return res.status(404).json({ msg: "Not Allowed" })
            }

            const orders = await orderService.getAllOrder()
            res.status(200).json({ orders })

        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }

    }

    async getOrderDetail(req, res) {

        const { id } = req.params

        try {
            const userId = req.user._id
            const user = await userService.findUser({ _id: userId })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            if (!user.isAdmin) {
                return res.status(404).json({ msg: "Not Allowed" })
            }

            const order = await orderService.getOrder(id)
            res.status(200).json({ order })

        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }

    }

    async getStats(req, res) {
        try {
            const userId = req.user._id
            const user = await userService.findUser({ _id: userId })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            if (!user.isAdmin) {
                return res.status(404).json({ msg: "Not Allowed" })
            }

            const orders = await orderService.getAllOrder()
            const users = await userService.getAllUsers()

            const sales = await orders.map((e) => e.totalPrice).reduce((a, b) => a + b, 0)

            res.status(200).json({
                totalSales: sales,
                totalUsers: users.length,
                totalOrders: orders.length
            })

        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }
    }
}

module.exports = new OrderController()