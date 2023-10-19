
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    role: {
      User: {
        default: 'USER',
        type: String,
      },
      Admin: String,
    },
    username: {
      type: String,
      unique: true,
    },
    refreshToken: String,
    isAlive: {
      type: Boolean,
      default: false,
    },
    profileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
