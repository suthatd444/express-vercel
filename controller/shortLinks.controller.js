const linksUtm = require('../models/shortLinksUtm.model');
const shortLinks = require('../models/shortLinks.model');

const { successResponse, errorResponse } = require('../helpers/common.helper');

const util = require("util");
const multer = require("multer");
var path = require("path");
__dirname = path.resolve();

const maxSize = 10 * 1024 * 1024 * 1024; //10 GB

/*******************PAN CARD UPLOAD */
let documentsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/uploads/qrImage");
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + '-qrImage' + path.extname(file.originalname));
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
}).fields([{ name: 'qrCodeImage', maxCount: 1 }]);

let uploadDocumentsMiddleware = util.promisify(uploadDocuments);

exports.shortLinksUtm = async (req, res) => {
    try {

        req.body.userId = req.user_id;

        const resultData = await linksUtm.create(req.body);
        console.log('resultData', resultData);
        successResponse['message'] = 'UTM Created Successfully.';
        successResponse['data'] = resultData;
        return res.send(successResponse);

    }
    catch (error) {
        console.log('err', error);
        errorResponse['message'] = error.message;
        return res.send(errorResponse);
    }
}


exports.shortLinks = async (req, res) => {
    try {
        await uploadDocumentsMiddleware(req, res).catch(err => {
            errorResponse['message'] = err.message;
            return res.send(errorResponse);
        });

        req.body.userId = req.user_id;

        let utmId = req.body.utmId;
        let destinationUrl = req.body.destinationUrl;
        let title = req.body.title;
        let brandedDomain = req.body.brandedDomain;
        let slashTag = req.body.slashTag;
        let tags = req.body.tags;
        let expirationDate = req.body.expirationDate;

        reqData = {
            utmId: utmId,
            destinationUrl: destinationUrl,
            title: title,
            brandedDomain: brandedDomain,
            slashTag: slashTag,
            tags: tags,
            expirationDate: expirationDate,
        }

        if (req.files.file) {
            let fileObj = req.files.file[0];
            reqData.qrCodeImage = fileObj.filename;
        }

        const resultData = await shortLinks.create(reqData);
        // console.log('resultData', resultData);
        successResponse['message'] = 'Short Links Created Successfully.';
        successResponse['data'] = resultData;
        return res.send(successResponse);

    }
    catch (error) {
        console.log('err', error);
        errorResponse['message'] = error.message;
        return res.send(errorResponse);
    }
}