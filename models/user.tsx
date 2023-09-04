import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tag: {
    type: String,
    required: [true, "Tag is Required"],
  },
  prompt: {
    type: String,
    required: [true, "Prompt is Required"],
  },
});

const Prompt = models.User || model("User", UserSchema);
export default Prompt;
