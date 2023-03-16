const jwt = require('jsonwebtoken')
const { secret } = require('../configs/config')

module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({ message: 'User not authenticated' })
            }
            const { roles: userRoles } = jwt.verify(token, secret)
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true    
                }
            })
            if (!hasRole) {
                return res.status(403).json({ message: 'Access denied' })
            }
            next()
        } catch(e) {
            console.error(e);
            res.status(403).json({ message: 'User not authenticated' })
        }
    }
}