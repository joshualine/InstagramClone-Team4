const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

// Protection from users that are not authenticated
const protected = asyncHandler(async(req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401).json('Not authorized, token failed')
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401).json('Not authorized, no token')
        throw new Error('Not authorized, no token')
    }
})


module.exports = {
    protected
}