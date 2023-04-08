const Board = require('../models/Board')
const Stage = require('../models/Stage')
const Connection = require('../models/Connection')

//fix this shyt
const attachStages = (board, stages, connections) => {
    const map = {}
    map.id = board._id
    map.name = board.name
    map.description = board.description
    map.stages = stages
    map.connections = connections
    return map
}

class mapController {
    async getMaps(req, res) {
        try {
            const boards = await Board.find({ user: req.user.id })
            res.send(boards)
        } catch(e) {
            console.error(e);
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async getMap(req, res) {
        try {
            const mapId = req.params.mapId
            const board = await Board.findOne({ _id: mapId })
            const stages = await Stage.find({ board: mapId })
            const connections = await Connection.find({ board: mapId })
            const map = attachStages(board, stages, connections)
            res.send(map)
        } catch(e) {
            console.error(e);
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async createMap(req, res) {
        try {
            const boardData = req.body
            boardData.user = req.user.id
            const board = new Board(boardData)
            board.save()
            res.json(board)
        } catch(e) {
            console.error(e);
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async deleteMap(req, res) {
        try {
            const mapId = req.params.mapId
            await Board.deleteOne({ _id: mapId })
            res.status(200).json({ message: 'deleted' })
        } catch(e) {
            console.error(e);
            res.status(400).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new mapController()