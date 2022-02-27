const userService = require('../services/user-service');

class UserController {
    async updatePersonal(req, res) {
        const { name, gender } = req.body;

        if (!name || !gender) {
            res.status(400).json({ msg: 'All Field are required' })

        }

        const userId = req.user._id

        try {
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

    async updateAddress(req, res) {
        const { address } = req.body;

        if (!address) {
            res.status(400).json({ msg: 'All Field are required' })

        }

        const userId = req.user._id

        try {
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
}

module.exports = new UserController()