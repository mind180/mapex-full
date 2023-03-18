const Board = require('../models/Board')

class BoardController {
    async getBoards(req, res) {
        try {
            const boards = await Board.find({})
            console.log(boards);
            dublicateId(boards)
            res.send(boards)
        } catch(e) {
            console.error(e);
            res.status(400).json({ message: 'Internal server error' })
        }
    }

    async getBoard(req, res) {
        try {
            const boardId = req.params.boardId
            console.log(boardId);
            const board = await Board.findOne({ _id: boardId })
            res.send(board)
        } catch(e) {
            console.error(e);
            res.status(400).json({ message: 'Internal server error' })
        }
    }
}

module.exports = new BoardController()