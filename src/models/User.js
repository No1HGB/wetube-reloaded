import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: String,
  name: { type: String, required: true },
  location: String,
  socialOnly: { type: Boolean, default: false },
  avatarUrl: String,
  //use array because it could contain many objects(videos)
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});
//mongoose middleware function
userSchema.pre("save", async function () {
  //pw hash repeatably whenever save videos because Video connects to User.
  //So User cannot login again, and fix this bug
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
