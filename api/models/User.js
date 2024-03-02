import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Creating Structure of the collection
const UserModel = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

// Creating collection
const User = mongoose.model("User", UserModel);
export default User;
