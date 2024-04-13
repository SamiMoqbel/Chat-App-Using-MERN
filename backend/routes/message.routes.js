const express = require('express');
const { sendMessage } = require("../controllers/message.controllers");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.post('/send/:id', protectRoute, sendMessage);

module.exports = router;