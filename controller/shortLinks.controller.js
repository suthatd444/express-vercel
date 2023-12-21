const linksUtm = require('../models/shortLinksUtm.model');
const shortLinks = require('../models/shortLinks.model');
const Joi = require('joi');
const mongoose = require('mongoose');

const connectDB = require("../database/connectMongo");

connectDB();
const { successResponse, errorResponse } = require('../helpers/common.helper');

const util = require("util");
const multer = require("multer");
var path = require("path");
const { decrypt } = require('dotenv');
__dirname = path.resolve();

const uploadFolder = '/uploads/qrImage/';


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

const uploadDocuments = multer({ storage: storage }).single('qrCodeImage');
let uploadDocumentsMiddleware = util.promisify(uploadDocuments);


exports.shortLinksUtm = async (req, res) => {
    try {

        req.body.userId = req.user_id;

        let campaignId = req.body.campaignId;
        let source = req.body.source;
        let medium = req.body.medium;
        let utmname = req.body.utmname;
        let term = req.body.term;
        let content = req.body.content;

        const schema = Joi.object().keys({
            campaignId: Joi.string().required(),
            source: Joi.string().required(),
            medium: Joi.string().required(),
            utmname: Joi.string().required(),
            term: Joi.string().required(),
            content: Joi.string().required(),
        });

        const { error, value } = schema.validate({ campaignId, source, medium, utmname, term, content });

        if (error) {
            errorResponse['message'] = error.details[0].message;
            return res.send(errorResponse);
        }

        const resultData = await linksUtm.create(req.body);
        // console.log('resultData', resultData);
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

        let userId = req.user_id;

        let utmId = req.body.utmId;
        let destinationUrl = req.body.destinationUrl;
        let title = req.body.title;
        let brandedDomain = req.body.brandedDomain;
        let slashTag = req.body.slashTag;
        let tags = req.body.tags;
        let expirationDate = req.body.expirationDate;

        const schema = Joi.object().keys({
            utmId: Joi.string().required('First get UTM Details'),
            destinationUrl: Joi.string().required(),
            title: Joi.string().required(),
            brandedDomain: Joi.string().required(),
            slashTag: Joi.string().required(),
            tags: Joi.string().required(),
            expirationDate: Joi.string().required(),

        });

        const { error, value } = schema.validate({ utmId, destinationUrl, title, brandedDomain, slashTag, tags, expirationDate });

        if (error) {
            errorResponse['message'] = error.details[0].message;
            return res.send(errorResponse);
        }

        reqData = {
            utmId: utmId,
            destinationUrl: destinationUrl,
            title: title,
            brandedDomain: brandedDomain,
            slashTag: slashTag,
            tags: tags,
            expirationDate: expirationDate,
            userId: userId
        }

        if (req.file) {
            let fileObj = req.file;
            reqData.qrCodeImage = fileObj.filename;
        }
        // console.log('reqData', reqData)
        // return false;


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


exports.shortLinksDelete = async (req, res) => {
    try {

        const id = req.params.id;

        const result = await shortLinks.updateMany(
            { _id: mongoose.Types.ObjectId(id) },
            { $set: { isDelete: true } }
        );
        const resultData = await shortLinks.find({ _id: mongoose.Types.ObjectId(id) });
        res.status(200).send({
            message: "Short Links Delete successfully",
            success: true,
            resultData
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}

exports.getShortLinksDataById = async (req, res) => {
    try {
        // console.log('req.params.id', req.params.id);
        // return false;
        let reqData = {
            _id: mongoose.Types.ObjectId(req.params.id),
        }
        let resultData = await shortLinks.aggregate([
            {
                $match: {
                    ...reqData,
                },
            },
            {
                $addFields: {
                    utmId: { $toObjectId: "$utmId" },
                },
            },
            {
                $lookup: {
                    from: 'utms',
                    localField: "utmId",
                    foreignField: '_id',
                    as: 'utms',
                },
            },
            {
                $unwind: {
                    path: "$utms",
                    preserveNullAndEmptyArrays: true,
                },
            },
        ]);

        // console.log('resultData111', resultData)
        // return false;
        res.status(200).send({
            message: "Short Links get Data By Id",
            success: true,
            resultData
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}

exports.updateShortLinksData = async (req, res) => {
    try {

        await uploadDocumentsMiddleware(req, res).catch(err => {
            errorResponse['message'] = err.message;
            return res.send(errorResponse);
        });

        const id = req.params.id;


        let utmId = req.body.utmId;
        let destinationUrl = req.body.destinationUrl;
        let title = req.body.title;
        let brandedDomain = req.body.brandedDomain;
        let slashTag = req.body.slashTag;
        let tags = req.body.tags;
        let expirationDate = req.body.expirationDate;

        const schema = Joi.object().keys({
            utmId: Joi.string().required('First get UTM Details'),
            destinationUrl: Joi.string().required(),
            title: Joi.string().required(),
            brandedDomain: Joi.string().required(),
            slashTag: Joi.string().required(),
            tags: Joi.string().required(),
            expirationDate: Joi.string().required(),

        });

        const { error, value } = schema.validate({ utmId, destinationUrl, title, brandedDomain, slashTag, tags, expirationDate });

        if (error) {
            errorResponse['message'] = error.details[0].message;
            return res.send(errorResponse);
        }

        reqData = {
            utmId: utmId,
            destinationUrl: destinationUrl,
            title: title,
            brandedDomain: brandedDomain,
            slashTag: slashTag,
            tags: tags,
            expirationDate: expirationDate,
        }

        if (req.file) {
            let fileObj = req.file;
            reqData.qrCodeImage = fileObj.filename;
        }
        // console.log('id', id);

        // console.log('reqData', reqData);
        // return false;
        await shortLinks.updateMany({ _id: mongoose.Types.ObjectId(id) }, reqData);

        const resultData = await shortLinks.find({ _id: mongoose.Types.ObjectId(id) });
        res.status(200).send({
            message: "short Links updated successfully",
            success: true,
            resultData
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}


exports.updateShortLinksUTMData = async (req, res) => {
    try {

        const id = req.params.id;

        let campaignId = req.body.campaignId;
        let source = req.body.source;
        let medium = req.body.medium;
        let utmname = req.body.utmname;
        let term = req.body.term;
        let content = req.body.content;
        // console.log('id', id)

        // console.log('req.body', req.body)
        // return false;

        const schema = Joi.object().keys({
            campaignId: Joi.string().required(),
            source: Joi.string().required(),
            medium: Joi.string().required(),
            utmname: Joi.string().required(),
            term: Joi.string().required(),
            content: Joi.string().required(),
        });

        const { error, value } = schema.validate({ campaignId, source, medium, utmname, term, content });

        if (error) {
            errorResponse['message'] = error.details[0].message;
            return res.send(errorResponse);
        }

        await linksUtm.updateMany({ _id: mongoose.Types.ObjectId(id) }, req.body);

        const resultData = await linksUtm.find({ _id: mongoose.Types.ObjectId(id) });
        res.status(200).send({
            message: "short Links UTM updated successfully",
            success: true,
            resultData
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}


exports.getShortLinksData = async (req, res) => {
    try {
        req.body.userId = req.user_id;

        const resultData = await shortLinks.find({ userId: `${req.user_id}`, isDelete: false });
        // console.log('resultData', resultData);
        // return false;
        res.status(200).send({
            message: "Short Links list get successfully",
            success: true,
            resultData
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }

}

exports.ShortLinksStatus = async (req, res) => {
    try {

        const id = req.params.id;
        let isActive = req.body.isActive;

        // const result = await shortLinks.updateMany(
        //     { _id: mongoose.Types.ObjectId(id) },
        //     { $set: { isDelete: true } }
        // );
        await shortLinks.updateMany({ _id: mongoose.Types.ObjectId(id) }, req.body);

        const resultData = await shortLinks.find({ _id: mongoose.Types.ObjectId(id) });
        if (isActive) {
            res.status(200).send({
                message: "Short Links Active successfully",
                success: true,
                resultData
            });
        } else {
            res.status(200).send({
                message: "Short Links Deactive successfully",
                success: true,
                resultData
            });
        }

    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}