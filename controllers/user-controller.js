const userService = require('../services/user-service');

class UserController {
    async updatePersonal(req, res) {
        const { name, gender } = req.body;

        try {
            if (!name || !gender) {
                return res.status(400).json({ msg: 'All Field are required' })

            }

            const userId = req.user._id

            const user = await userService.findUser({ _id: userId })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            user.name = name;
            user.gender = gender
            user.save()
            res.status(200).json({ user })
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: "Internal Server Error" })
        }

    }

    async addAddress(req, res) {
        const { street, landmark, country, state, city, pincode } = req.body;

        try {

            if (!street || !landmark || !country || !state || !city || !pincode) {
                return res.status(400).json({ msg: 'All Field are required' })
            }

            const userId = req.user._id

            const user = await userService.findUser({ _id: userId })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            const address = { street, landmark, country, state, city, pincode }

            user.address.push(address)
            user.save()
            res.status(200).json({ user })
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: "Internal Server Error" })
        }

    }

    async deleteAddress(req, res) {
        const { id } = req.params

        try {

            if (!id) {
                return res.status(400).json({ msg: 'All Field are required' })
            }

            const userId = req.user._id

            const user = await userService.findUser({ _id: userId })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            const updatedAddress = user.address.filter(e => e._id != id)
            user.address = updatedAddress
            user.save()
            res.status(200).json({ user })
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: "Internal Server Error" })
        }

    }

    async getAllUsers(req, res) {
        try {
            const userId = req.user._id
            const user = await userService.findUser({ _id: userId })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            if (!user.isAdmin) {
                return res.status(404).json({ msg: "Not Allowed" })
            }

            const users = await userService.getAllUsers()
            res.status(200).json({ users })

        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: 'Internal Server Error' })
        }
    }

}

module.exports = new UserController()