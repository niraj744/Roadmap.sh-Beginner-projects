import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required field."],
    },
    title: { type: String, required: [true, "Title is required field."] },
    content: { type: String, required: [true, "Content is required field."] },
    category: { type: String, required: [true, "Category is required field."] },
    tags: [
      {
        type: String,
        required: [true, "Tags is required field."],
        min: [2, "Minmum 2 tags are required."],
      },
    ],
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", Schema);

export default Post;
