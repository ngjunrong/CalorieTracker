const User = require("../model/userModel");

//@desc     Register a new user
//@route    POST /api/auth/register
//@access   public
exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  //check if user exist
  const userExist = await User.findOne({ username: req.body.username });

  if (userExist) {
    return res.status(400).json({ message: "Username already taken" });
  }

  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      password: hash,
    })
      .then((user) =>
        res.status(200).json({
          message: "User successfully created",
           user,
        })
      )
      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      );
  });
};

//@desc     Check user for log in credentials
//@route    POST /api/auth/login
//@access   public
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      res.status(200).json({
        message: "Login successful",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

//Update User
// exports.update = async (req, res, next) => {
//   const { role, id } = req.body;
//   // First - Verifying if role and id is present
//   if (role && id) {
//     // Second - Verifying if the value of role is admin
//     if (role === "admin") {
//       // Finds the user with the id
//       await User.findById(id)
//         .then((user) => {
//           // Third - Verifies the user is not an admin
//           if (user.role !== "admin") {
//             user.role = role;
//             user.save((err) => {
//               //Monogodb error checker
//               if (err) {
//                 res
//                   .status("400")
//                   .json({ message: "An error occurred", error: err.message });
//                 process.exit(1);
//               }
//               res.status("201").json({ message: "Update successful", user });
//             });
//           } else {
//             res.status(400).json({ message: "User is already an Admin" });
//           }
//         })
//         .catch((error) => {
//           res
//             .status(400)
//             .json({ message: "An error occurred", error: error.message });
//         });
//     }
//   }
// };

//Delete User
exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  const checkUser = await User.findById(id);

  if (!checkUser) {
    return res.status(400).json({ message: "User not found" });
  }
  await User.deleteOne(checkUser)
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};


//Hash User Passwords
const bcrypt = require("bcryptjs")
