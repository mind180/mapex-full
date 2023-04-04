const { Router } = require('express')
const stageController = require('../controllers/stageController')

const router = new Router({})
router.get('/maps/:mapId/stages', stageController.getStages)
router.post('/maps/:mapId/stages', stageController.saveStages)
router.put('/maps/:mapId/stages/:stageId', stageController.updateStage)
router.delete('/maps/:mapId/stages/:stageId', stageController.deleteStage)

module.exports = router