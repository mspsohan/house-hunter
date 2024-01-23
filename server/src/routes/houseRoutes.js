const express = require('express');
const { getHomes, getAllHouse, addHouse, deleteHouse, updateHouse } = require('../controllers/houseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(addHouse).get(protect, getHomes);

router.get("/all", getAllHouse)

router.delete('/:id', protect, deleteHouse);

router.put('/:id', protect, updateHouse);

module.exports = router;
