const Comment = require('../models/Comment');
const paginate = require('../helper/paginate');
const getById = require('../helper/getById');

exports.addComment = async (req, res) => {
    try {
        const data = { ...req.body }
        data.addedBy = req.logInid
        const commentData = await Comment.create(data)
        if (!commentData) {
            return res.status(400).json({ status: 400, message: `Not able to add the comment!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `Comment added successfully`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.updateComment = async (req, res) => {
    try {
        const data = { ...req.body }

        const checkComment = await Comment.findById(req.params.id)
        if (!checkComment) {
            return res.status(400).json({ status: 400, message: 'This comment is not exits!!', data: [] });
        }
        const comment = await Comment.findByIdAndUpdate(req.params.id, data)
        if (!comment) {
            return res.status(400).json({ status: 400, message: `Not able to update the comment!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `Comment updated successfully!!`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const checkComment = await Comment.findById(req.params.id)
        if (!checkComment) {
            return res.status(400).json({ status: 400, message: 'This blog is not exits!!', data: [] });
        }

        const comment = await Comment.findByIdAndRemove(req.params.id)
        if (!comment) {
            return res.status(400).json({ status: 400, message: `Not able to delete the comment!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `Comment deleted successfully!!`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.geAllComments = async (req, res) => {
    try {
        const option = { ...req.body };
        if (!option.hasOwnProperty('query')) {
            option['query'] = {};
        }

        const comments = await paginate(option, Comment);
        if (!comments) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to fetch the data!!" })
        }
        return res.status(200).json(comments);
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
        const getbyid = await getById(option, Comment);
        if (!getbyid) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to fetch the data!!" })
        }
        return res.status(200).json({ success: true, status: 200, data: getbyid })
    }
    catch (error) {
        next(error);
    }
}