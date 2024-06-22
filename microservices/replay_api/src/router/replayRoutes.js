const express = require('express');
const {replayGame} = require('../controllers/replayController');

const router = express.Router();
router.get('/replay/:id', replayGame);

module.exports = router;