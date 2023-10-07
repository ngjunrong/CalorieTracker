const asyncHandler = require("express-async-handler");

const Food = require("../model/foodModel");

//@desc     GET all food value
//@route    GET /api/food
//@access   public
const getFoods = asyncHandler(async (req, res) => {
  const foods = await Food.find();
  res.status(200).json(foods);
});

//@desc     GET 1 food value from the id
//@route    GET/api/food/:id
//@access   public
const getFood = asyncHandler(async (req, res) => {
  const ObjectId = require("mongoose").Types.ObjectId;
  const food = await Food.find({ _id: new ObjectId(req.params.id) });
  res.status(200).json(food);
});

//@desc     POST 1 food
//@route    POST/api/food
//@access   public
const postFood = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.calorie) {
    res.status(400);
    throw new Error("Please add a value for the food");
  }

  //check if food exist
  const foodExist = await Food.findOne({ name: req.body.name });

  if (foodExist) {
    res.status(400);
    throw new Error("Food already exist");
  }
  const food = await Food.create({
    name: req.body.name,
    calorie: req.body.calorie,
    fat: req.body.fat,
    protein: req.body.protein,
    carbs: req.body.carbs,
  });

  res.status(200).json(food);
});

module.exports = {
  getFoods,
  getFood,
  postFood,
};
