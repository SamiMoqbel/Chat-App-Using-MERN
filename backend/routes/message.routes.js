const express = require('express');
const { sendMessage, getConversation } = require("../controllers/message.controllers");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.get('/:id', protectRoute, getConversation);
router.post('/send/:id', protectRoute, sendMessage);

module.exports = router;