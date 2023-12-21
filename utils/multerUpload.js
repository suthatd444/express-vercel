const multer = require('multer');
let fs = require('fs-extra');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let type = req.params.type;
        let path = `./uploads/${file.mimetype.split("/")[0]}`;
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg'|| file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter });

module.exports = { upload }