import { Response } from 'express';
import jwt from 'jsonwebtoken';


export const CreateToken = (userId:string,response:Response) => {

    const token = jwt.sign({userId},process.env.JWT_SECRET as string,{expiresIn:"10d"})

    response.cookie("jwt",token,{
        httpOnly:true,
        maxAge:1000 * 60 * 60 * 24 * 10, // 10 days
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"
    })

    return token

}
