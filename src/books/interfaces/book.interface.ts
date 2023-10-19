import { Document } from 'mongoose';

export interface Book extends Document {
  author: string;
  ISBN: string;
  profileUrl: string;
  title: string;
  description: string;
  price: number;
}