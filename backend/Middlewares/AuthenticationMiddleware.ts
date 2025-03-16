import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import User from "../Models/UserModel";
import {UserDocument} from "../Types/Types";


export const AuthenticationMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    
    try {

        const token = req.cookies.jwt as string;

        if(!token){
        
            return res.status(401).json({message:"Unauthorized"});
        
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

        const user = await User.findById(decodedToken.userId) as UserDocument;

        if(!user){
        
            return res.status(401).json({message:"Unauthorized"});
        
        }

        req.user = user;

        next();
    
    } catch (error) {
    
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    
    }
}