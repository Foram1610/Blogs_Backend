const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        let filter = {
            $or: [
                { username: username },
                { email: username },
                { mobile: username }
            ]
        }
        let user = await User.findOne(filter)
        if (!user) {
            return res.status(409).json({ status: 400, message: 'This User is not exits!!', data: [] });
        }
        const isMatch = await bcrypt.compare(password, user.password) 
        if (!isMatch) {
            return res.status(400).json({ status: 400, message: 'Invalid Password!!', data: [] });
        }
        const JWTTokenObj = {
            id: user._id.toString(),
            type: user.userRole
        };
        const token = jwt.sign(JWTTokenObj, process.env.SECRET_KEY, { expiresIn: '8h' });
        return res.status(200).json({ status: 200, message: 'Login Successfully!!', token: token })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.me = async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.logInid })
            .select('-__v -createdAt -updatedAt -password')
        return res.status(200).json({ status: 200, message: "Logged in user's data.", data: data })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}