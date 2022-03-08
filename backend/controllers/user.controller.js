const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');



// @description     Register a new user
// @route           POST /api/users
// @access          Public
const registerUser = asyncHandler(async(req, res) => {
    const { firstname, lastname, email, phone, following, followers, password, username } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        firstname,
        lastname,
        email,
        phone,
        following,
        followers,
        password,
        username
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            following: user.following,
            followers: user.followers,
            username: user.username,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Authenticated Users
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({}).select('-password')
    res.json(users)
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Authenticated Users
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            username: user.username,
            following: user.following,
            followers: user.followers,
            token: generateToken(user._id),
        })
    } else {
        res.status(401).json('Invalid email or password')
            // throw new Error('Invalid email or password')

    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Authenticated user
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            username: user.username,
            following: user.following,
            followers: user.followers,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})





module.exports = {
    getUsers,
    registerUser,
    getUserById,

    authUser,
    getUserProfile,
}