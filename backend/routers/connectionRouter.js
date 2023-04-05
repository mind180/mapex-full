const { Router } = require('express')
const connectionController = require('../controllers/connectionController')

const router = new Router({})
router.post('/maps/:mapId/connections', connectionController.createConnections)
router.put('/maps/:mapId/connections', connectionController.updateConnections)
router.delete('/maps/:mapId/connections', connectionController.deleteConnection)

module.exports = router