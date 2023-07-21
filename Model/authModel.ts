import mongoose from "mongoose";

interface iAuth {
  userName?: string;
  email?: string;
  password?: string;
  avatarID?: string;
  avatar?: string;
}

interface iAuthData extends iAuth, mongoose.Document {}

const authModel = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      min: 7,
      require: true,
    },
    avatarID: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iAuthData>("auth", authModel);
