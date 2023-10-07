const express = require("express");

const router = express.Router();

const { getHistory, saveHistory } = require("../controllers/historyController");

router.post("/", getHistory);
router.post("/saveHistory", saveHistory);

module.exports = router;
