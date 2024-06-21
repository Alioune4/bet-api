const express = require('express');

const router = express.Router();
const {getOpenGames} = require('../controllers/betController');


router.get('/open-games', getOpenGames);

module.exports = router;
