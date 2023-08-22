const Blog = require('../models/Blog')
const paginate = require('../helper/paginate');
const getById = require('../helper/getById');

exports.addBlog = async (req, res) => {
    try {
        const data = { ...req.body }
        let image = 'defBlog.png'
        if (req.file !== undefined) {
            image = req.file.filename;
        }
        data.image = image;
        data.addedBy = req.logInid
        const blogData = await Blog.create(data)
        if (!blogData) {
            return res.status(400).json({ status: 400, message: `Not able to create the blog!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `Blog created successfully`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const data = { ...req.body }

        const checkBlog = await Blog.findById(req.params.id)
        if (!checkBlog) {
            return res.status(400).json({ status: 400, message: 'This blog is not exits!!', data: [] });
        }
        let image = checkBlog.image
        if (req.file !== undefined) {
            image = req.file.filename;
        }
        data.image = image;

        const blog = await Blog.findByIdAndUpdate(req.params.id, data)
        if (!blog) {
            return res.status(400).json({ status: 400, message: `Not able to update the blog!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `Blog updated successfully!!`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const checkBlog = await Blog.findById(req.params.id)
        if (!checkBlog) {
            return res.status(400).json({ status: 400, message: 'This blog is not exits!!', data: [] });
        }

        const blog = await Blog.findByIdAndRemove(req.params.id)
        if (!blog) {
            return res.status(400).json({ status: 400, message: `Not able to delete the blog!!`, data: [] })
        }
        return res.status(200).json({ status: 200, message: `Blog deleted successfully!!`, data: [] })

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message, data: [] })
    }
}

exports.geAllBlog = async (req, res) => {
    try {
        const option = { ...req.body };
        if (!option.hasOwnProperty('query')) {
            option['query'] = {};
        }
        // option.query['addedBy'] = { $ne: null }

        const blogs = await paginate(option, Blog);
        if (!blogs) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to fetch the data!!" })
        }
        return res.status(200).json(blogs);
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
        const getbyid = await getById(option, Blog);
        if (!getbyid) {
            return res.status(400).json({ success: false, status: 400, message: "Something went wrong, Not able to fetch the data!!" })
        }
        return res.status(200).json({ success: true, status: 200, data: getbyid })
    }
    catch (error) {
        next(error);
    }
}
