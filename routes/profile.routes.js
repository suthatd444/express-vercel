const express = require('express');
const router = express.Router();
const auth = require('../utils/authorization')
const { multerAny } = require('../helpers/common.helper');
const { updateProfile } = require('../controller/profile.controller')
/**
 * @swagger
 * /updateProfile:
 *   post:
 *     summary: Update user profile
 *     description: >
 *       Update user profile with the provided information.
 *       The JWT authentication token should be included in the "Authorization" header using the following format: Bearer <token>
 *     security:
 *       - bearerAuth: []
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
 *             
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *                 example: Doe
 *               mobile:
 *                 type: string
 *                 description: The phone number of the user.
 *                 example: +1234567890
 *               country:
 *                 type: string
 *                 description: The country of the user.
 *                 example: United States
 *     responses:
 *       200:
 *         description: Successful profile update
 *         content:
 *           application/json:
 *             example:
 *               message: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: authorization
 *     in: headers
 *     description: 'Use the following format: Bearer <token>'
 */

router.post('/updateProfile', auth, multerAny, updateProfile)

module.exports = router
