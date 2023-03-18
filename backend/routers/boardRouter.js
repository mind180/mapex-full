const { Router } = require('express')
const boardController = require('../controllers/boardController')

const router = new Router({})
router.get('/canvas', boardController.getBoards)
router.get('/canvas/:boardId', boardController.getBoard)

module.exports = router