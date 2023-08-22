const { check, validationResult } = require('express-validator')

exports.checkUser = [
    check('firstName').trim().not().isEmpty().withMessage('FirstName is required!!!'),
    check('lastName').trim().not().isEmpty().withMessage('LastName is required!!!'),
    check('email').isEmail().withMessage("Please enter proper emailid!!"),
    check('username').trim().not().isEmpty().withMessage('Username is required!!!'),
    check('mobile').trim().not().isEmpty().withMessage('Mobile number is required!!!'),
    check('password').trim().not().isEmpty().withMessage('password is required!!!').isLength({ min: 6 }).not().withMessage("Password's length must be 6 digit!!")
]

exports.login = [
    check('username').trim().not().isEmpty().withMessage('Username is required!!!'),
    check('password').trim().not().isEmpty().withMessage('password is required!!!')
]

exports.checkBlog = [
    check('title').trim().not().isEmpty().withMessage('Title is required for the blog!!!'),
    check('description').trim().not().isEmpty().withMessage('Description is required for the blog!!!'),
    check('category').trim().not().isEmpty().withMessage('Category is required for the blog!!!'),
]

exports.valResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array()[0].msg;
        return res.status(422).json({ success: false, error: error })
    }
    next();
};