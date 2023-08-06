const asyncHandler = require("express-async-handler");
const Image = require("../models/imageModel");
const User = require("../models/userModel");

//@desc Get image
//@route GET /api/images/:id
//@access public
const getImage = asyncHandler(async (req, res) => {
  const image = await Image.findOne({ _id: req.params.id });
  if (!image) {
    res.status(404);
    throw new Error("image is not found");
  }
  const { _id, user_id, title, description, image_url, likes, saves, createdAt, updatedAt } = image;
  const imageCreator = await User.findOne({ _id: user_id });
  res.status(200);
  res.json({
    _id,
    imageCreator: imageCreator.username,
    title,
    description,
    image_url,
    likes,
    saves,
    createdAt
  });
});

//@desc Create image
//@route POST /api/images/
//@access public
const createImage = asyncHandler(async (req, res) => {
  const { user_id, title, description, image_url } = req.body;
  const image = await Image.create({
    user_id,
    title,
    description,
    image_url
  });

  if (image) {
    res.status(201).json(image);
  } else {
    res.status(400);
    throw new Error("Failed to create image");
  }
});


//@desc Get image
//@route GET /api/images/:id
//@access public
const getFeedImages = asyncHandler(async (req, res) => {
  const images = await Image.find().sort(likes)
});