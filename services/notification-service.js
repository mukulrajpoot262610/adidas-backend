const notificationModal = require('../models/notification-modal')


class NotificationService {
    async createNotification(data) {
        try {
            const notification = await notificationModal.create(data)
            return notification
        } catch (err) {
            console.log(err)
        }
    }

    async getNotifications() {
        try {
            const notifications = await notificationModal.find()
            return notifications
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new NotificationService()