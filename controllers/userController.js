const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Image = require("../models/imageModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registred");
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("hashedPassword: " + hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });

  console.log(`user create ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "register the user" });
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id
        }
      },
      process.env.ACCESS_TOKEN_SECRET
      // {expiresIn: "30m"}
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

//@desc current user images
//@route GET /api/users/images/:id
//@access public
const userImages = asyncHandler(async (req, res) => {
  const userImages = await Image.find({ user_id: req.params.id });
  if (userImages.length > 0) {
    res.json(userImages);
  } else {
    res.json("userImages: user has no image");
  }
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  userImages
};
