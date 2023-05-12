const { Router } = require('express')
const stageController = require('../controllers/stageController')

const router = new Router({})
router.get('/maps/:mapId/stages', stageController.getStages)
router.get('/stages/:stageId', stageController.getStage)
router.post('/maps/:mapId/stages', stageController.saveStages)
router.put('/stages/:stageId', stageController.updateStage)
router.put('/stages/:stageId/status', stageController.updateStageStatus)
router.delete('/maps/:mapId/stages/:stageId', stageController.deleteStage)

module.exports = router