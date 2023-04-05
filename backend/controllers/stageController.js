const Stage = require('../models/Stage')

class StageController {
    async getStages(req, res) {
        try {
            const mapId = req.params.mapId
            const stages = await Stage.find({ board: mapId })
            res.send(stages)
        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async saveStages(req, res) {
        try {
            const mapId = req.params.mapId
            const stagesData = req.body
            stagesData.forEach(stage => {
                stage.board = mapId
            })
            const stages = await Stage.create(stagesData)
            res.send(stages)
        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async updateStage(req, res) {
        try {
            const stage = req.body
            await Stage.findByIdAndUpdate(stage._id, stage)
            res.send(stage)
        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async deleteStage(req, res) {
        try {
            const stageId = req.params.stageId
            await Stage.findByIdAndDelete(stageId)
            res.status(200).json({ message: 'deleted' })
        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new StageController()