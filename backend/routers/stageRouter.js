const { Router } = require('express')
const stageController = require('../controllers/stageController')

const router = new Router({})
router.get('/maps/:mapsId/stages', stageController.getStages)
router.post('/maps/:mapsId/stages', stageController.saveStages)
router.put('/maps/:mapsId/stages/:stageId', stageController.updateStage)
router.delete('/maps/:mapsId/stages/:stageId', stageController.deleteStage)

module.exports = router