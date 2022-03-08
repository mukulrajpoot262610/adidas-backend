const userService = require("../services/user-service")
const orderService = require("../services/order-service")
const productService = require("../services/product-service")
const notificationService = require("../services/notification-service")

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

            const ids = orderItems.map((e) => ({ id: e.product._id, qty: e.qty }))

            productService.decreaseCountStock(ids)

            await notificationService.createNotification({
                orderNumber: order._id,
                title: 'placed'
            })

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
            const notification = await notificationService.getNotifications()

            const sales = await orders.map((e) => e.totalPrice).reduce((a, b) => a + b, 0)

            res.status(200).json({
                totalSales: sales,
                totalUsers: users.length,
                totalOrders: orders.length,
                notifications: notification.slice(0, 8)
            })

        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }
    }

    async updateStatus(req, res) {
        const { id } = req.params
        const { status } = req.body

        try {

            if (!status) {
                return res.status(400).json({ msg: 'All Field are required' })
            }

            const userId = req.user._id
            const user = await userService.findUser({ _id: userId })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            if (!user.isAdmin) {
                return res.status(404).json({ msg: "Not Allowed" })
            }

            const order = await orderService.getOrder(id)

            order.status = status

            await order.save()

            res.status(200).json({ order })

        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }

    }

    async getStatus(req, res) {
        const { id } = req.params

        try {
            const userId = req.user._id
            const user = await userService.findUser({ _id: userId })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            const status = await orderService.getOrder(id)

            res.status(200).json({ status: status.status, time: status.updatedAt })

        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }

    }
}

module.exports = new OrderController()