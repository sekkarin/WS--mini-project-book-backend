import { Document } from 'mongoose';

export interface Book extends Document {
  name: string;
  author: string;
  ISBN: string;
  profileUrl: string;
  title: string;
  description: string;
  price: number;
}