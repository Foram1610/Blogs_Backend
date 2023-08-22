const jwt = require('jsonwebtoken');
const User = require('../models/User')

var checkUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization && !authorization.startsWith('Bearer')) {
            return res.status(403).json({ message: 'Token expired!!!' })
        }
        else {
            let token = authorization.split(' ')[1]
            const { id } = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findById(id)
            req.userRole = user.userRole
            req.logInid = id;
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized User!!' })
    }
}

module.exports = checkUser