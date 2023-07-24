import mongoose from "mongoose";

interface iTeacher {
  userName?: string;
  email?: string;
  password?: string;
  avatarID?: string;
  avatar?: string;
}

interface iTeacherData extends iTeacher, mongoose.Document {}

const teacherModel = new mongoose.Schema(
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

export default mongoose.model< iTeacherData>("teacher", teacherModel);
