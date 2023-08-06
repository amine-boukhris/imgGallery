const express = require("express");
const router = express.Router();
const { getFeedImages, getImage, createImage, updateImage, deleteImage } = require("../controllers/imageController");
const validateToken = require("../middleware/validateTokenHandler");
const multer = require("multer");

router.use(validateToken);
router.route("/").get(getFeedImages);
router.route("/").post(createImage);
router.route("/:id").get(getImage);
router.route("/:id").put(updateImage);
router.route("/:id").delete(deleteImage);

module.exports = router;
