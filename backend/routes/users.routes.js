const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const { getUsers } = require("../controllers/users.controllers");

const router = express.Router();

router.get("/", protectRoute, getUsers);

module.exports = router;    