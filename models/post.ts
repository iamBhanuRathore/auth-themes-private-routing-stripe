import mongoose, { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  title: String,
  content: mongoose.Schema.Types.Mixed,
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // Reference to User model
});

const post = models.Post || model("Post", postSchema);
export default post;
