const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileController = require('../controllers/fileControllers')

router.post('', authMiddleware, fileController.createDir)
router.get('', authMiddleware, fileController.getFiles)

module.exports = router