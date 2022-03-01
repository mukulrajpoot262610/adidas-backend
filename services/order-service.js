const orderModal = require("../models/order-modal")

class OrderService {

    async createOrder(data) {
        try {
            const order = await orderModal.create(data)
            return order
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new OrderService()