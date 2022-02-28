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
}

module.exports = new ProductService()