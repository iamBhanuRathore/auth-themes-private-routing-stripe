import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  emailVerified: { type: Boolean, default: false },
  image: String,
  hashedPassword: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const user = models.User || model("User", UserSchema);
export default user;

// const mongoose = require('mongoose');

// const accountSchema = new mongoose.Schema({
//   id: { type: String, default: () => mongoose.Types.ObjectId().toString() },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
//   type: String,
//   provider: String,
//   providerAccountId: String,
//   refresh_token: String,
//   access_token: String,
//   expires_at: Number,
//   token_type: String,
//   scope: String,
//   id_token: String,
//   session_state: String,
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// const sessionSchema = new mongoose.Schema({
//   id: { type: String, default: () => mongoose.Types.ObjectId().toString() },
//   sessionToken: { type: String, unique: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
//   expires: Date,
// });

// const userSchema = new mongoose.Schema({
//   id: { type: String, default: () => mongoose.Types.ObjectId().toString() },
//   name: String,
//   email: { type: String, unique: true },
//   emailVerified: Date,
//   image: String,
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }], // Reference to Account model
//   sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }], // Reference to Session model
//   stripeCustomerId: { type: String, unique: true },
//   stripeSubscriptionId: { type: String, unique: true },
//   stripePriceId: String,
//   stripeCurrentPeriodEnd: Date,
// });

// const verificationTokenSchema = new mongoose.Schema({
//   identifier: String,
//   token: { type: String, unique: true },
//   expires: Date,
// });

// const postSchema = new mongoose.Schema({
//   id: { type: String, default: () => mongoose.Types.ObjectId().toString() },
//   title: String,
//   content: mongoose.Schema.Types.Mixed,
//   published: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
// });

// const Account = mongoose.model('Account', accountSchema);
// const Session = mongoose.model('Session', sessionSchema);
// const User = mongoose.model('User', userSchema);
// const VerificationToken = mongoose.model('VerificationToken', verificationTokenSchema);
// const Post = mongoose.model('Post', postSchema);

// module.exports = {
//   Account,
//   Session,
//   User,
//   VerificationToken,
//   Post,
// };
