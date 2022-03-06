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

    async decreaseStockCount(id) {
        try {
            const product = await ProductModal.findById(id)
            console.log(product)
            // product.quantity = product.quantity - e.qty
            // await product.save()
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new ProductService()