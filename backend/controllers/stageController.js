const Stage = require('../models/Stage')

class StageController {
    async getStages(req, res) {
        try {
            const boardId = req.params.boardId
            const stages = Stagae.find({ board: boardId })
        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async saveStages(req, res) {
        try {
            const stages = req.body
            await Stage.create(stages)
            res.send(stages)
        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async updateStage(req, res) {
        try {
            
        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async deleteStage(req, re) {
        try {
            
        } catch(e) {
            console.error(e)
            res.status(400).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new StageController()