const Like = require('../models/Like');
const paginate = require('../helper/paginate');
const getById = require('../helper/getById');

exports.addLike = async (req, res) => {
    try {
        const data = { ...req.body }
        data.addedBy = req.logInid
        const checkLike = await Like.findOne({ $and: [{ addedBy: data.addedBy }, { blog: data.blog }] })
        if (checkLike) {
            let status = true
            if (checkLike.status === true) {
                status = false
            }
            const like = await Like.findByIdAndUpdate(checkLike._id, { status: status })
            if (!like) {
                return res.status(400).json({ status: 400, message: `Not able to like the blog!!`, data: [] })
            }
            return res.status(200).json({ status: 200, message: `Liked it!!!!`, data: [] })
        }
        const likeData = await Like.create(data)
        if (!likeData) {
            return res.status(400).json({ status: 400, message: `Not able to like the blog!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `Liked it!!`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.updateLike = async (req, res) => {
    try {
        const data = { ...req.body }

        const checkLike = await Like.findById(req.params.id)
        if (!checkLike) {
            return res.status(400).json({ status: 400, message: 'This users like is not exits!!', data: [] });
        }
        const like = await Like.findByIdAndUpdate(req.params.id, data)
        if (!like) {
            return res.status(400).json({ status: 400, message: `Not able to update the like!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `Like updated successfully!!`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.deleteLike = async (req, res) => {
    try {
        const checkLike = await Like.findById(req.params.id)
        if (!checkLike) {
            return res.status(400).json({ status: 400, message: 'This blog is not exits!!', data: [] });
        }

        const like = await Like.findByIdAndRemove(req.params.id)
        if (!like) {
            return res.status(400).json({ status: 400, message: `Not able to delete the like!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `Like deleted successfully!!`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.getAllLikes = async (req, res) => {
    try {
        const option = { ...req.body };
        if (!option.hasOwnProperty('query')) {
            option['query'] = {};
        }

        const likes = await paginate(option, Like);
        if (!likes) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to fetch the data!!" })
        }
        return res.status(200).json(likes);
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
        const getbyid = await getById(option, Like);
        if (!getbyid) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to fetch the data!!" })
        }
        return res.status(200).json({ success: true, status: 200, data: getbyid })
    }
    catch (error) {
        next(error);
    }
}