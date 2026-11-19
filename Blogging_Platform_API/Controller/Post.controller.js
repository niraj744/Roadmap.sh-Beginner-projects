import Post from "../Db/Post.db.js";
import User from "../Db/User.db.js";
import CustomError from "../Utils/CustomError.js";

const create = async (req, res) => {
  const { title, content, category, tags } = req.body;
  const user = await User.findById(req.user._id);
  const create = await Post.create({
    user: req.user._id,
    title,
    content,
    category,
    tags,
  });
  user.Posts.push(create._id);
  user.save({ validateModifiedOnly: true });
  res.json({
    create,
    Message: "Post create successfully.",
  });
};
const update = async (req, res) => {
  const id = req.params.id;
  const { title, content, category, tags } = req.body;
  const update = await Post.findByIdAndUpdate(
    id,
    {
      title,
      content,
      category,
      tags,
    },
    { returnDocument: "after" },
  );
  if (!update) throw new CustomError("Invalid id.");
  res.json({
    update,
    Message: "Successfully updated post.",
  });
};
const deletePost = async (req, res) => {
  const id = req.params.id;
  const update = await Post.findByIdAndDelete(id);
  if (!update) throw new CustomError("Invalid id.");
  const updateUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { Posts: id },
    },
    { returnDocument: "after" },
  );
  res.json({
    updateUser,
    Message: "Successfully deleted post.",
  });
};
const singlePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("user", "-password");
  if (!post) throw new CustomError("Invalid id could not found post.", 404);
  res.json({
    post,
    message: "Successfully retrived post.",
  });
};
const getPosts = async (req, res) => {
  const searchTerm = req.query.term;
  const regex = new RegExp(searchTerm, "i");
  const post = await Post.find({
    user: req.user._id,
    $or: [
      { title: regex },
      { content: regex },
      { category: regex },
      { tags: regex },
    ],
  }).populate("user", "-password");
  res.json({
    post,
    message: "Successfully retrived post.",
  });
};

const controller = {
  create,
  update,
  deletePost,
  singlePost,
  getPosts,
};

export default controller;
