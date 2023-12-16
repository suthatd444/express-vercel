const multer = require("multer");
exports.multerAny = multer().any();

exports.successResponse = {
    status: 200,
    message: '',
    data: []
}

exports.errorResponse = {
    status: 400,
    message: '',
    data: []
}

exports.unauthResponse = {
    status: 401,
    message: '',
    data: []
}

