const express = require('express');
const router = express.Router();
const auth = require('../utils/authorization')
const { shortLinksUtm, shortLinks } = require('../controller/shortLinks.controller.js')

/**
 * @swagger
 * /shortLinksUtm:
 *   post:
 *     summary: shortLinksUtm
 *     description: >
 *       shortLinksUtm with the provided information.
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
 *               campaignId:
 *                 type: string
 *                 description: The campaignId.
 *                 example: abc123
 *             
 *               source:
 *                 type: string
 *                 description: The source.
 *                 example: fb
 *               medium:
 *                 type: string
 *                 description: The medium.
 *                 example: banner
 *               name:
 *                 type: string
 *                 description: The name.
 *                 example: summer
 *               term:
 *                 type: string
 *                 description: The term.
 *                 example: keywords
 *               content:
 *                 type: string
 *                 description: The content.
 *                 example: ad name
 *     responses:
 *       200:
 *         description: shortLinksUtm
 *         content:
 *           application/json:
 *             example:
 *               message: shortLinksUtm successfully
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

router.post('/shortLinksUtm', auth, shortLinksUtm)



/**
 * @swagger
 * /shortLinks:
 *   post:
 *     summary: shortLinks
 *     description: >
 *       shortLinks with the provided information.
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
 *               utmId:
 *                 type: string
 *                 description: The utmId.
 *                 example: 657d8
 *             
 *               destinationUrl:
 *                 type: string
 *                 description: The destinationUrl.
 *                 example: https://example.com
 *               title:
 *                 type: string
 *                 description: The title.
 *                 example: title
 *               brandedDomain:
 *                 type: string
 *                 description: The brandedDomain.
 *                 example: divsly.com
 *               slashTag:
 *                 type: string
 *                 description: The slashTag.
 *                 example: /
 *               qrCodeImage:
 *                 type: string
 *                 description: The qrCodeImage.
 *                 example: image.png
 *               tags:
 *                 type: string
 *                 description: The tags.
 *                 example: tags
 *               expirationDate:
 *                 type: string
 *                 description: The expirationDate.
 *                 example: 10-11-2023
 *     responses:
 *       200:
 *         description: shortLinks
 *         content:
 *           application/json:
 *             example:
 *               message: shortLinks successfully
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


router.post('/shortLinks', auth, shortLinks)


module.exports = router
