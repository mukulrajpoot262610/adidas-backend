const productService = require('../services/product-service');
const userService = require('../services/user-service');

class ProductController {
    async addProduct(req, res) {
        const { category, country, desc, gender, image, importer, name, price, quantity, salePrice, subname, thumbnail } = req.body;

        if (!category || !country || !desc || !gender || !image || !importer || !name || !price || !quantity || !salePrice || !subname || !thumbnail) {
            return res.status(400).json({ msg: 'All Field are required' })
        }

        const userId = req.user._id

        try {
            const user = await userService.findUser({ _id: userId })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            if (!user.isAdmin) {
                return res.status(404).json({ msg: "Not Allowed" })
            }

            const product = await productService.createProduct({ category, country, desc, gender, image, importer, name, price, quantity, salePrice, subname, thumbnail, user: user._id })

            res.status(200).json({ product })

        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: "Internal Server Error" })
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await productService.fetchProducts()
            res.status(200).json({ products })
        } catch (err) {
            console.log(err)
        }
    }

    async getProduct(req, res) {
        const { id } = req.params

        try {
            const product = await productService.fetchProductsFromId(id)
            res.status(200).json({ product })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new ProductController()