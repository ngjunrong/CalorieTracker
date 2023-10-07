const express = require("express");

const router = express.Router();
const {
  getFoods,
  getFood,
  postFood,
} = require("../controllers/foodController");

router.get("/", getFoods);
router.get("/:id", getFood);

router.post("/", postFood);
module.exports = router;
