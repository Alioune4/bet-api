const express = require('express');
const {createGame,updateGameStatus,updateGameScore} = require('../controllers/GameController');

const router = express.Router();

router.post('/games', createGame);
router.put('/games/:id/next-status', updateGameStatus);
router.put('/games/:id/kill', updateGameScore);


module.exports = router;
