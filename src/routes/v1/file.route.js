const express = require('express');
const fileController = require('../../controllers/file.controller');

const router = express.Router();

router
  .route('/')
  .post(fileController.createFile)
  .get(fileController.getFiles);

router
  .route('/:fileId')
  .get(fileController.getFile)
  .patch(fileController.updateFile)
  .delete(fileController.deleteFile);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File management and retrieval
 */

/**
 * @swagger
 * /files:
 *   post:
 *     summary: Create a file
 *     description: No auth.
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - parentId
 *               - path
 *               - fileType
 *             properties:
 *               name:
 *                 type: string
 *               parentId:
 *                 type: string
 *               path:
 *                 type: string
 *               fileType:
 *                 type: string
 *             example:
 *               name: fake name
 *               parentId: home
 *               path: 'home/'
 *               fileType: folder
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/File'
 *
 *   get:
 *     summary: Get all files
 *     description: No Auth.
 *     tags: [Files]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: File name
 *       - in: query
 *         name: parentId
 *         schema:
 *           type: string
 *         description: File parentId
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of files
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/File'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: Get a file
 *     description: No Auth.
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: file id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/File'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a file
 *     description: No Auth,
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parentId:
 *                 type: string
 *               path:
 *                 type: string
 *               fileType:
 *                 type: string
 *             example:
 *               name: fake name
 *               parentId: home
 *               path: 'home/'
 *               fileType: folder
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/File'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a file
 *     description: No Auth
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: File id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */