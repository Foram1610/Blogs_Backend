const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'avatar') {
            cb(null, 'public/avatar');
        }
        else if (file.fieldname === 'image') {
            cb(null, 'public/blogs');
        }
        else {
            cb(null, 'public');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/)) {
            return cb(new Error(('This Image type is not proper type for upload the image!!')), false)
        }
        cb(undefined, true)
    }
})

module.exports = upload