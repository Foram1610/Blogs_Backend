const mongoose = require('mongoose');
const { PAGINATE_OPTIONS } = require('../utils/pagination.constant');
const mongoosePaginate = require('mongoose-paginate-v2');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: String,
    category: {
        type: String,
        enum: ["Web", "React", "Angular", "Javascript", "Business", "Finance", "Stock", "Tech"],
        require: true
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

mongoosePaginate.paginate.options = PAGINATE_OPTIONS;
BlogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Blog', BlogSchema, 'Blog')