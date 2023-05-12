const { Router } = require('express')
const mapController = require('../controllers/mapController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = new Router({})
router.use(authMiddleware)
router.get('/maps', mapController.getMaps)
router.get('/maps/all', mapController.getCommunityMaps)
router.get('/maps/:mapId', mapController.getMap)
router.get('/maps/:mapId/img', mapController.getMapImage)
router.post('/maps', mapController.createMap)
router.put('/maps/:mapId/img', mapController.saveImage)
router.delete('/maps/:mapId', mapController.deleteMap)

module.exports = router