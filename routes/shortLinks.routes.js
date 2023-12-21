const express = require('express');
const router = express.Router();
const auth = require('../utils/authorization')
const { shortLinksUtm, shortLinks, shortLinksDelete, getShortLinksData, getShortLinksDataById, updateShortLinksData, updateShortLinksUTMData, ShortLinksStatus } = require('../controller/shortLinks.controller.js')

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
 *               utmname:
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               utmId:
 *                 type: string
 *                 description: The utmId of the user.
 *                 example: 657d8573c702f8ba824b61c3
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
 *                 example: divx.cc
 *               slashTag:
 *                 type: string
 *                 description: The slashTag.
 *                 example: /
 *               tags:
 *                  type: string
 *                  description: the tags
 *                  example: tag
 *               expirationDate:
 *                  type: string
 *                  description: the expirationDate
 *                  example: 10-11-2023
 *               qrCodeImage:
 *                 type: string
 *                 format: binary
 *                 description: Choose a file for the user's qr image.
 *     responses:
 *       200:
 *         description: Successful Short Links Add
 *         content:
 *           application/json:
 *             example:
 *               message: Short Links Add successfully
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

/**
 * @swagger
 * /shortLinksDelete/{id}:
 *   delete:
 *     summary: Delete Short Link by ID
 *     description: Delete a short link by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the short link to delete.
 *     responses:
 *       200:
 *         description: Successful deletion of the short link
 *         content:
 *           application/json:
 *             example:
 *               message: Short Link deleted successfully
 *       404:
 *         description: Short Link not found
 *         content:
 *           application/json:
 *             example:
 *               message: Short Link not found
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

router.delete('/shortLinksDelete/:id', auth, shortLinksDelete)


/**
 * @swagger
 * /getShortLinksData:
 *   get:
 *     summary: getShortLinksData
 *     description: >
 *       getShortLinksData with the provided information.
 *       The JWT authentication token should be included in the "Authorization" header using the following format: Bearer <token>
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: getShortLinksData
 *         content:
 *           application/json:
 *             example:
 *               message: getShortLinksData get successfully
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

router.get('/getShortLinksData', auth, getShortLinksData)

/**
 * @swagger
 * /getShortLinksDataById/{id}:
 *   get:
 *     summary: Get Short Link by ID
 *     description: Retrieve a short link by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the short link to retrieve.
 *     responses:
 *       200:
 *         description: Successful retrieval of the short link
 *       404:
 *         description: Short Link not found
 *         content:
 *           application/json:
 *             example:
 *               message: Short Link not found
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

router.get('/getShortLinksDataById/:id', auth, getShortLinksDataById)


/**
 * @swagger
 * /updateShortLinksData/{id}:
 *   put:
 *     summary: Update Short Links
 *     description: Update short links with the provided information.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the short link to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               utmId:
 *                 type: string
 *                 description: The utmId of the user.
 *                 example: 657d8573c702f8ba824b61c3
 *               destinationUrl:
 *                 type: string
 *                 description: The destinationUrl.
 *                 example: https://example.com
 *               title:
 *                 type: string
 *                 description: The title.
 *                 example: updated title
 *               brandedDomain:
 *                 type: string
 *                 description: The brandedDomain.
 *                 example: updated divx.cc
 *               slashTag:
 *                 type: string
 *                 description: The slashTag.
 *                 example: /updated
 *               tags:
 *                  type: string
 *                  description: the tags
 *                  example: updated tag
 *               expirationDate:
 *                  type: string
 *                  description: the expirationDate
 *                  example: 10-11-2023
 *               qrCodeImage:
 *                 type: string
 *                 format: binary
 *                 description: Choose a file for the user's qr image.
 *     responses:
 *       200:
 *         description: Successful Short Links Update
 *         content:
 *           application/json:
 *             example:
 *               message: Short Links Updated successfully
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

router.put('/updateShortLinksData/:id', auth, updateShortLinksData)

/**
 * @swagger
 * /updateShortLinksUTMData/{id}:
 *   put:
 *     summary: Update UTM
 *     description: Update UTM with the provided information.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the UTM to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               campaignId:
 *                 type: string
 *                 description: The campaignId of the user.
 *                 example: abcd1234
 *               source:
 *                 type: string
 *                 description: The source.
 *                 example: instagram
 *               medium:
 *                 type: string
 *                 description: The medium.
 *                 example: updated medium
 *               utmname:
 *                 type: string
 *                 description: The utmname.
 *                 example: updated utmname
 *               term:
 *                 type: string
 *                 description: The term.
 *                 example: term
 *               content:
 *                  type: string
 *                  description: The content.
 *                  example: updated content
 *     responses:
 *       200:
 *         description: Successful UTM Update
 *         content:
 *           application/json:
 *             example:
 *               message: UTM Updated successfully
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

router.put('/updateShortLinksUTMData/:id', auth, updateShortLinksUTMData)

/**
 * @swagger
 * /ShortLinksStatus/{id}:
 *   put:
 *     summary: Update Short Links Activation & Deactivation
 *     description: Update short links activation status with the provided information.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the short links to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 description: The activation status of the short links.
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful Short Links Update
 *         content:
 *           application/json:
 *             example:
 *               message: Short Links Updated successfully
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
router.put('/ShortLinksStatus/:id', auth, ShortLinksStatus)


module.exports = router
