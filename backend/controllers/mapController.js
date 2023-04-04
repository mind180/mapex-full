const Board = require('../models/Board')

class mapController {
    async getMaps(req, res) {
        try {
            const boards = await Board.find({})
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
            res.send(board)
        } catch(e) {
            console.error(e);
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async createMap(req, res) {
        try {
            const boardData = req.body
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
            const board = await Board.deleteOne({ _id: mapId })
            res.status(200).json({ message: 'deleted' })
        } catch(e) {
            console.error(e);
            res.status(400).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new mapController()