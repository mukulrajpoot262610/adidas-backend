const tokenService = require('../services/token-service')

module.exports = async function (req, res, next) {

    try {
        const { accessCookie } = req.cookies

        if (!accessCookie) {
            throw new Error()
        }

        const userData = await tokenService.verifyAccessToken(accessCookie)

        if (!userData) {
            throw new Error()
        }

        // if (!userData.isAdmin) {
        //     return res.status(401).json({ msg: 'Not Allowed' })
        // }

        req.user = userData
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Invalid Token' })
    }

}