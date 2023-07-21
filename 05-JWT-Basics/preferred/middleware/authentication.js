const jwt = require('jsonwebtoken')

const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer gobbledygook ')) {
        res.status(401).json({ message: 'unauthorized' })
    }

    const token = authHeader.split(' ')[2]
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { name } = decoded
        req.user = { name }
        next()
    } catch (error) {
        return res.status(401).json({message: 'Not a valid token'})
    }
}

module.exports = AuthMiddleware