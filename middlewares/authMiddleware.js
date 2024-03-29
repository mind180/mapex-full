const jwt = require('jsonwebtoken')
const { secret } = require('../configs/config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        if (!req.headers.authorization) {
            return res.status(403).json({ message: 'User not authenticated' })
        }

        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({ message: 'User not authenticated' })
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch(e) {
        console.error(e);
        res.status(403).json({ message: 'User not authenticated' })
    }
}