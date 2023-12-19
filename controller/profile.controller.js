const User = require('../models/user.model');
const { successResponse, errorResponse } = require('../helpers/common.helper');
const Joi = require('joi');

const util = require("util");
const multer = require("multer");
const fs = require('fs');

var path = require("path");
__dirname = path.resolve();

const uploadFolder = '/uploads/profile/';
// Ensure the upload folder exists
// if (!fs.existsSync(uploadFolder)) {
//     fs.mkdirSync(uploadFolder, { recursive: true });
// }

// Set up Multer middleware
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        console.log('__dirname + uploadFolder', __dirname + uploadFolder);
        cb(null, __dirname + uploadFolder);
    },

    filename: function (req, file, cb) {
        // Customize the filename
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFilename);
    }
});

const uploadDocuments = multer({ storage: storage }).single('profileImage');
let uploadDocumentsMiddleware = util.promisify(uploadDocuments);

exports.updateProfile = async (req, res) => {
    let reqData;
    try {

        await uploadDocumentsMiddleware(req, res).catch(err => {
            errorResponse['message'] = err.message;
            return res.send(errorResponse);
        });

        let userId = req.user_id;

        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let mobile = req.body.mobile;
        let country = req.body.country;

        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            mobile: Joi.string()
                .regex(/^[0-9]{10}$/)  // Assumes a 10-digit numeric mobile number
                .message('Mobile number must be a 10-digit numeric value')
                .required(),
            country: Joi.string().required(),
        });

        const { error, value } = schema.validate({ firstName, lastName, mobile, country });

        if (error) {
            errorResponse['message'] = error.details[0].message;
            return res.send(errorResponse);
        }

        reqData = {
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            country: country,
        }


        if (req.file) {
            let fileObj = req.file;
            reqData.profileImage = fileObj.filename;
        }


        User.findByIdAndUpdate(userId, reqData, { new: true })
            .then(data => {
                if (!data) {
                    errorResponse['message'] = "User not found with id " + userId
                    res.send(errorResponse);
                }
                successResponse['message'] = "User Profile Updated Successfully";
                successResponse['data'] = data;
                res.status(200).send(successResponse);
            }).catch(err => {
                errorResponse['message'] = err.message || "Some error occurred while Update User Profile."
                res.send(errorResponse);
            });


    }
    catch (error) {
        console.log('err', error);
        errorResponse['message'] = error.message;
        return res.send(errorResponse);
    }
}