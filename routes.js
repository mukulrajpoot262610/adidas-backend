const router = require('express').Router()
const authController = require('./controllers/auth-controller');
const productController = require('./controllers/product-controller');
const userController = require('./controllers/user-controller');
const orderController = require('./controllers/order-controller');
const authMiddleware = require('./middlewares/auth-middleware');
const adminMiddleware = require('./middlewares/admin-middleware');
const paymentController = require('./controllers/payment-controller');

router.post('/api/send-otp', authController.sendOtp)
router.post('/api/verify-otp', authController.verifyOtp)
router.post('/api/verify-admin-otp', authController.verifyAdminOtp)
router.get('/api/refresh', authController.refresh)
router.post('/api/update-personal', authMiddleware, userController.updatePersonal)
router.post('/api/address', authMiddleware, userController.addAddress)
router.delete('/api/address/:id', authMiddleware, userController.deleteAddress)

router.post('/api/logout', authMiddleware, authController.logout)

router.get('/api/products', productController.getAllProducts)
router.get('/api/product/:id', productController.getProduct)

router.post('/api/place-order', authMiddleware, orderController.placeOrder)
router.post('/api/products', adminMiddleware, productController.addProduct)
router.get('/api/stats', adminMiddleware, orderController.getStats)

///////////////////////////
// USERS ROUTES
router.get('/api/users', adminMiddleware, userController.getAllUsers)

///////////////////////////
// ORDERS ROUTES
router.get('/api/orders', adminMiddleware, orderController.getAllOrders)
router.get('/api/order/:id', adminMiddleware, orderController.getOrderDetail)
router.post('/api/order-status/:id', adminMiddleware, orderController.updateStatus)
router.get('/api/order-status/:id', authMiddleware, orderController.getStatus)

///////////////////////////
// PAYMENT ROUTES
router.get('/api/checkout', paymentController.initiatePayment)

module.exports = router;