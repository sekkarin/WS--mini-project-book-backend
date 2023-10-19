import * as mongoose from 'mongoose';

export const bookSchema = new mongoose.Schema(
  {
    author: String,
    ISBN: String,
    profileUrl: String,
    title: String,
    description: String,
    price: Number,
  },
  {
    timestamps: true,
  },
);
