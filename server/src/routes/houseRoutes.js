const express = require('express');
const { getHomes, addHouse } = require('../controllers/houseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

router.route("/").post(addHouse).get(protect, getHomes)
// router.post("/", addHouse)

module.exports = router