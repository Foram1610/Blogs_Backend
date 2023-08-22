const User = require('../models/User')
const paginate = require('../helper/paginate');
const getById = require('../helper/getById');

exports.addUser = async (req, res) => {
    try {
        const data = { ...req.body }
        let avatar = 'def.png'
        if (req.file !== undefined) {
            avatar = req.file.filename;
        }
        data.avatar = avatar;
        const user = await User.findOne({ $or: [{ email: data.email }, { username: data.username }] })
        if (user) {
            return res.status(409).json({ status: 409, message: 'User already exits!!', data: [] });
        }
        const userData = new User(data)
        const user1 = await userData.save()
        if (!user1) {
            return res.status(400).json({ status: 400, message: `User not registered!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `User registered successfully!!`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const data = { ...req.body }

        const checkUser = await User.findById(req.params.id)
        if (!checkUser) {
            return res.status(400).json({ status: 400, message: 'This user is not exits!!', data: [] });
        }
        let avatar = checkUser.avatar
        if (req.file !== undefined) {
            avatar = req.file.filename;
        }
        data.avatar = avatar;
        const user = await User.findOne({ email: data.email })
        if (user) {
            return res.status(409).json({ status: 409, message: 'This email is already exits!!', data: [] });
        }

        const user1 = await User.findByIdAndUpdate(req.params.id, data)
        if (!user1) {
            return res.status(400).json({ status: 400, message: `User's data not updated!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `User's data updated successfully!!`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const checkUser = await User.findById(req.params.id)
        if (!checkUser) {
            return res.status(400).json({ status: 400, message: 'This user is not exits!!', data: [] });
        }

        const user = await User.findByIdAndRemove(req.params.id)
        if (!user) {
            return res.status(400).json({ status: 400, message: `User is not deleted!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `User deleted successfully!!`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.geAllUser = async (req, res) => {
    try {
        const option = { ...req.body };
        if (!option.hasOwnProperty('query')) {
            option['query'] = {};
        }
        // option.query['addedBy'] = { $ne: null }

        const users = await paginate(option, User);
        if (!users) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to fetch the data!!" })
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

exports.getById = async (req, res, next) => {
    try {
        const option = { ...req.body.data };
        if (!option.hasOwnProperty('query')) {
            option['query'] = {};
        }
        option.query['_id'] = req.params.id
        const getbyid = await getById(option, User);
        if (!getbyid) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to fetch the data!!" })
        }
        return res.status(200).json({ success: true, status: 200, data: getbyid })
    }
    catch (error) {
        next(error);
    }
}