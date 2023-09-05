import { Schema, model, models } from "mongoose";

const AccountsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  type: String,
  provider: { type: String, unique: true },
  providerAccountId: { type: String, unique: true },
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
});

const accounts = models.AccountOAuth || model("AccountOAuth", AccountsSchema);
export default accounts;
