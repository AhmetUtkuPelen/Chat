import { Document } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    password: string;
    fullName: string;
    profilePicture: string;
    createdAt: Date;
    updatedAt: Date;
  }
  

  declare global {
      namespace Express {
        interface Request {
          user?: UserDocument;
        }
      }
    }