const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");

//@desc     GET all calorie history of user
//@route    POST /api/history
//@access   private

const getHistory = asyncHandler(async (req, res) => {
  const ObjectId = require("mongoose").Types.ObjectId;
  const data = await User.find({ _id: new ObjectId(req.body.id) }).select(
    "history -_id"
  );
  res.status(200).json(data);
});

//@desc     POST current calorie data to user database
//@route    POST /api/history/saveHistory
//@access   private
const saveHistory = asyncHandler(async (req, res) => {
  const ObjectId = require("mongoose").Types.ObjectId;
  const data = {
    date: req.body.date,
    calorie: req.body.calorie,
    fat: req.body.fat,
    protein: req.body.protein,
    carbs: req.body.carbs,
  };
  const history = await User.updateOne(
    {
      _id: new ObjectId(req.body.id),
    },
    {
      $push: {
        history: data,
      },
    }
  );

  res.status(200).json(history);
});

module.exports = {
  getHistory,
  saveHistory,
};
