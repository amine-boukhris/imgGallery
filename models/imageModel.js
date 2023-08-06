const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user"
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    image_url: {
      type: String,
      required: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Image", imageSchema);
