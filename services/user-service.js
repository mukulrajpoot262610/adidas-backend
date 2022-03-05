const UserModel = require('../models/user-modal')

class UserService {
    async findUser(filter) {
        const user = await UserModel.findOne(filter).populate('orders')
        return user
    }

    async getAllUsers() {
        try {
            const users = await UserModel.find()
            return users
        } catch (err) {
            return err
        }
    }

    async createUser(data) {
        const user = await UserModel.create(data)
        return user
    }
}

module.exports = new UserService()