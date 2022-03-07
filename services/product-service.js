const ProductModal = require('../models/product-modal')

class ProductService {

    async createProduct(data) {
        try {
            const product = await ProductModal.create(data)
            return product
        } catch (err) {
            console.log(err)
        }
    }

    async fetchProducts() {
        try {
            const products = await ProductModal.find()
            return products
        } catch (err) {
            console.log(err)
        }
    }

    async fetchProductsFromId(id) {
        try {
            const product = await ProductModal.findById(id)
            return product
        } catch (err) {
            console.log(err)
        }
    }

    async decreaseCountStock(ids) {
        try {
            ids.map(async (e) => {
                const order = await ProductModal.findById(e.id)
                order.quantity = order.quantity - e.qty
                await order.save()
                return order
            })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new ProductService()