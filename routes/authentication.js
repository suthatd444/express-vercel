const express = require('express');
const router = express.Router();
const auth = require('../utils/authorization')
const { signup, logout, forgotPassword, login, changePassword, otpAuth } = require('../controller/auth.controller')
/**
 * @swagger
 * /signUp:
 *   post:
 *     summary: Logs in a user
 *     description: Logs in a user with the provided credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The username of the user.
 *                 example: test11
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: Vijay@123
 *               repassword:
 *                 type: string
 *                 description: The password of the user.
 *                 example: Vijay@123
 *     responses:
 *       200:
 *         description: Successful Register
 *         content:
 *           application/json:
 *             example:
 *               message: Account Create Successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized
 */
router.post('/signUp', signup)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Logs in a user
 *     description: Logs in a user with the provided credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *          
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: Vijay@123
 *            
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               message: login Successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized
 */

router.post('/login', login)

router.put('/changePassword/', auth, changePassword)

router.put('/forgotPassword/', forgotPassword)
router.get('/logout', auth, logout)

module.exports = router