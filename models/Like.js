const mongoose = require('mongoose');
const { PAGINATE_OPTIONS } = require('../utils/pagination.constant');
const mongoosePaginate = require('mongoose-paginate-v2');

const LikeSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

mongoosePaginate.paginate.options = PAGINATE_OPTIONS;
LikeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Like', LikeSchema, 'Like')