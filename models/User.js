const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { PAGINATE_OPTIONS } = require('../utils/pagination.constant');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    mobile: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String
    },
    avatar: String,
    userRole: {
        type: Number,
        enum: [0, 1],
        default: 1
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})
mongoosePaginate.paginate.options = PAGINATE_OPTIONS;
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema, 'User')