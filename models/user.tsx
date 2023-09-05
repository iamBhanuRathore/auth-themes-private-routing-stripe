import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  emailVerified: { type: Date, default: Date.now },
  image: String,
  hashedPassword: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const user = models.User || model("User", UserSchema);
export default user;
