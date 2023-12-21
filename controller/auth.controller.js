const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var md5 = require('md5');
const Joi = require('joi');

const User = require('../models/user.model');
const { successResponse, errorResponse } = require('../helpers/common.helper');

// const Otp = require('../db/models/otp')

const STATUS_CODE = require('../config/errors')

const connectDB = require("../database/connectMongo");

connectDB();
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * API to Add User SignUp
 */
const saltRounds = 10;
exports.signup = async (req, res) => {
    try {
       
        const username = req.body.userName;
        const email = req.body.email;
        const password = req.body.password;
        const repassword = req.body.repassword;

     
        const schema = Joi.object().keys({
            username: Joi.string().min(6).required(),
            email: Joi.string()
                .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
                .required('email required'),
            password: Joi.string()
                .min(8) // Minimum length of 8 characters
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) // Requires at least one lowercase, one uppercase, one digit, and one special character
                .message('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character')
                .required()
        });

        const { error, value } = schema.validate({ username, email, password });

        if (error) {
            errorResponse['message'] = error.details[0].message;
            return res.send(errorResponse);
        }

        if (password != repassword) {
            errorResponse['message'] = 'Password Not Matched With Re-Password';
            return res.send(errorResponse);
        }


        let checkUserExists = await User.findOne({ "email": email, "userType": "user", isActive: true, isDelete: false });

        if (checkUserExists) {
            errorResponse['message'] = 'Account already exists with this email';
            return res.send(errorResponse);
        }
        else {
            let userObject = {
                username: username,
                email: email,
                userType: 'user',
                password: md5(password),
            };

        
            const user = new User(userObject);
            let data = await user.save();
            let token = jwt.sign({ user_id: data._id, email: data.email }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
            data.token = token;

            successResponse['message'] = 'User Registered Successfully.';
            successResponse['data'] = data;
            return res.send(successResponse);
        }

    }
    catch (error) {
        console.log('Error', error);
        errorResponse['message'] = error.message;
        return res.send(errorResponse);

    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * API to Authenticate User
 */
exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const schema = Joi.object().keys({
            email: Joi.string()
                .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
                .required('email required'),
            password: Joi.string().required('password required')
        });

        const { error, value } = schema.validate({ email, password });

        if (error) {
            errorResponse['message'] = error.details[0].message;
            return res.send(errorResponse);
        }

        let user = await User.findOne({
            email: email,
            userType: 'user',
            password: md5(password),
            // is_active: true,
            isDelete: false
        });

        if (!(user)) {
            errorResponse['message'] = "Invalid email and password"
            res.send(errorResponse);
        } else {
            let token = jwt.sign({ user_id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: "7d" });

            const mainArray = {
                "bearer_token": token,
                "isActive": user.isActive,
                "isDelete": user.isDelete,
                "_id": user._id,
                "token_type": "Bearer",
                "email": user.email,
                "userType": user.userType,
                "username": user.username
            }

            // console.log('mainArray', mainArray)
            // return false;
            successResponse['message'] = 'User Login Successfully.';
            successResponse['data'] = mainArray;
            return res.send(successResponse);
        }

    } catch (error) {
        console.log('Error', error);
        errorResponse['message'] = error.message;
        return res.send(errorResponse);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * API to Change Password
 */

exports.changePassword = async (req, res) => {
    try {

        const userData = await userModel.getUserData({ "id": req.user_id });
        const { new_password } = req.body;
        // if (!validator.isStrongPassword(new_password, { minLength: 6 })) {
        //     return res.status(STATUS_CODE.SERVER_BAD_REQUEST).json({ error: true, message: 'Weak Password' })
        // }

        // if (!validator.isLength(password, { max: 30 })) {
        //     return res.status(STATUS_CODE.SERVER_BAD_REQUEST).json({ error: true, message: 'Password length exceeds' })
        // }

        try {

            const changedPassword = await userModel.register({
                "id": userData.data[0].id,
                "password": bcrypt.hashSync(new_password, saltRounds),

            });

            return res.status(STATUS_CODE.SERVER_SUCESS).json({ error: false, message: "Password Changed" })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_INTERNAL_ERROR_CODE).json({ error: true, message: err.message })
        }

    } catch (err) {
        return res.status(STATUS_CODE.SERVER_INTERNAL_ERROR_CODE).json({ error: true, message: err.message })
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        let user;

        const { email, new_password, mobile } = req.body
        // if (!validator.isStrongPassword(newPassword, { minLength: 8, minSymbols: 1 })) {
        //     return res.status(STATUS_CODE.SERVER_BAD_REQUEST).json({ error: true, message: 'Weak Password' })
        // }
        // if (!validator.isLength(newPassword, { max: 30 })) {
        //     return res.status(STATUS_CODE.SERVER_BAD_REQUEST).json({ error: true, message: 'Password length exceeds' })
        // }

        if (mobile) {
            user = await userModel.getUserData({ "mobile": mobile });
            if (!user.data.length > 0) return res.status(STATUS_CODE.SERVER_BAD_REQUEST).json({ error: true, message: 'Wrong Credentials' })

        } else if (email) {
            user = await userModel.getUserData({ "email": email });
            if (!user.data.length) return res.status(STATUS_CODE.SERVER_BAD_REQUEST).json({ error: true, message: 'Wrong Credentials' })
        }

        try {

            const forgotPassword = await userModel.register({
                "id": user.data[0].id,
                "password": bcrypt.hashSync(new_password, saltRounds),

            });
            return res.status(STATUS_CODE.SERVER_SUCESS).json({ error: false, message: "Password Reset" })
        }
        catch (err) {
            return res.status(STATUS_CODE.SERVER_INTERNAL_ERROR_CODE).json({ error: true, message: err.message })
        }
    } catch (err) {
        return res.status(STATUS_CODE.SERVER_INTERNAL_ERROR_CODE).json({ error: true, message: 'Cannot Forgot Password' })

    }

}


exports.logout = async (req, res) => {
    try {

        const token = jwt.sign({ user_id: req.user_id }, process.env.JWT_SECRET, { expiresIn: 1 });
        return res.status(STATUS_CODE.SERVER_SUCESS).json({ error: false, message: "Logged out!", data: token })
    }
    catch (err) {
        return res.status(STATUS_CODE.SERVER_INTERNAL_ERROR_CODE).json({ error: true, message: err.message })
    }

}
