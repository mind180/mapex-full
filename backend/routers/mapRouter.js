const { Router } = require('express')
const mapController = require('../controllers/mapController')

const router = new Router({})
router.get('/maps', mapController.getMaps)
router.get('/maps/:mapId', mapController.getMap)
router.post('/maps', mapController.createMap)
router.delete('/maps/:mapId', mapController.deleteMap)

module.exports = router