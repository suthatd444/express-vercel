const User = require('../models/user.model');
const { successResponse, errorResponse } = require('../helpers/common.helper');

const util = require("util");
const multer = require("multer");
var path = require("path");
__dirname = path.resolve();

const maxSize = 10 * 1024 * 1024 * 1024; //10 GB

/*******************PAN CARD UPLOAD */
let documentsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/uploads/profile");
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + '-profile' + path.extname(file.originalname));
    },
});

let uploadDocuments = multer({
    storage: documentsStorage,
    limits: { fileSize: maxSize },
    //     fileFilter(req,file,cb){
    //         if(!file.originalname.match(/\.(png:jpg:jpeg)$/)){
    //             return cb(new Error('Please upload an image file!'))
    //         }
    // }
}).fields([{ name: 'profileImage', maxCount: 1 }]);

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

        if (!firstName) {
            errorResponse['message'] = 'Please enter valid firstName';
            return res.send(errorResponse);
        }

        if (!lastName) {
            errorResponse['message'] = 'Please enter valid lastName';
            return res.send(errorResponse);
        }

        if (!mobile) {
            errorResponse['message'] = 'Please enter valid Contact.';
            return res.send(errorResponse);
        }

        if (!country) {
            errorResponse['message'] = 'Please enter valid country.';
            return res.send(errorResponse);
        }

        reqData = {
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            country: country,
        }

        // console.log('userId', userId)
 
        if (req.files.file) {
            let fileObj = req.files.file[0];
            reqData.profileImage = fileObj.filename;
        }
        // console.log('reqData', reqData)
        // console.log('userId', userId)

        // return false;

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