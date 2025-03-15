import { CreateToken } from './../Utilities/CreateToken';
import {Request, Response} from 'express';
import User from '../Models/UserModel';
import bcryptjs from 'bcryptjs';

// ? REGISTER ? \\
export const Register = async (req:Request,res:Response) => {

    const {fullName,email,password} = req.body;

    try {

        // ? check if user fills all fields ? \\
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password Must Be At Least 6 Characters !"})
        }

        if(fullName.length < 3){
            return res.status(400).json({message:"Full Name Must Be At Least 3 Characters !"})
        }

        // ? check if user email is a valid one ? \\
        if(!email.includes("@")){
            return res.status(400).json({message:"Invalid Email ! Please Try Again !"})
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({message:"User With This Email Already Exists !"})
        }

        // ? Hash Pasword ? \\
        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
        
            // ? jwt ? \\
            CreateToken(newUser._id as any, res)

            await newUser.save()

            return res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePicture:newUser.profilePicture
            })
        
        }else{
        
            return res.status(400).json({message:"User Not Created! Something Went Wrong !"})
        
        }

    } catch (error) {

        res.status(500).json({message:"Internal Server Error"})
       
        console.log(error);

    }

}
// ? REGISTER ? \\



export const Login = async (req:Request,res:Response) => {

}



export const LogOut = async (req:Request,res:Response) => {

}