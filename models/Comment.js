const mongoose = require('mongoose');
const { PAGINATE_OPTIONS } = require('../utils/pagination.constant');
const mongoosePaginate = require('mongoose-paginate-v2');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

mongoosePaginate.paginate.options = PAGINATE_OPTIONS;
CommentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', CommentSchema, 'Comment')