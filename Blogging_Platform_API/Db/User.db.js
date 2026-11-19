import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      min: [5, "Username lenght must be at least 5 characters"],
      lowercase: true,
      validate: [
        {
          validator: async function (value) {
            const existingUser = await this.constructor.findOne({
              username: value,
            });
            return !existingUser;
          },
          message: "Username already exists",
        },
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      min: [5, "Password lenght must be at least 5 characters."],
      validate: [
        {
          validator: function (value) {
            return /^(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[^A-Za-z0-9]).{5,}$/.test(
              value,
            );
          },
          message:
            "Password must be at least 5 characters, include 1 uppercase letter, 2 numbers, and 1 symbol",
        },
      ],
    },
    Posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "Post",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", Schema);

export default User;
