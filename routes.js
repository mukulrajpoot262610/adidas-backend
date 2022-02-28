
const router = require('express').Router()
const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');
const authMiddleware = require('./middlewares/auth-middleware');

router.post('/api/send-otp', authController.sendOtp)
router.post('/api/verify-otp', authController.verifyOtp)
router.post('/api/verify-admin-otp', authController.verifyAdminOtp)
router.get('/api/refresh', authController.refresh)
router.post('/api/update-personal', authMiddleware, userController.updatePersonal)
router.post('/api/address', authMiddleware, userController.addAddress)
router.delete('/api/address/:id', authMiddleware, userController.deleteAddress)
router.post('/api/logout', authMiddleware, authController.logout)

module.exports = router;