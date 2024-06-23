const express = require('express');

const router = express.Router();
const {addFavorite, removeFavorite} = require('../controllers/favoriteController');


router.post('', addFavorite);
router.delete('', removeFavorite);

module.exports = router;
