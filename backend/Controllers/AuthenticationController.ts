import { CreateToken } from './../Utilities/CreateToken';
import {Request, Response} from 'express';
import User from '../Models/UserModel';
import bcryptjs from 'bcryptjs';
import cloudinary from '../Cloudinary/Cloudinary';




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




// ? LOGIN ? \\
export const Login = async (req:Request,res:Response) => {
    const {email,password} = req.body;
    
    console.log("Login attempt with:", { email, password: password ? "***" : undefined });

    try {
        if (!email || !password) {
            return res.status(400).json({message:"Email and password are required"});
        }
        
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"Credentials Are Invalid, Please Try Again!"});
        }

        const IsPasswordCorrect = await bcryptjs.compare(password,user.password)

        if(!IsPasswordCorrect){
            return res.status(400).json({message:"Credentials Are Invalid, Please Try Again!"});
        }

        CreateToken(user._id as any, res)

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePicture:user.profilePicture
        })
    } catch (error) {
        console.error("Login error on server:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
// ? LOGIN ? \\




// ? LOGOUT ? \\
export const LogOut = async (req:Request,res:Response) => {

    try {
        
        // ? kill the cookie ? \\
        res.cookie("jwt","",{
            maxAge:0
        })

        res.status(200).json({message:"User Logged Out Successfully !"})

    } catch (error) {
        
        res.status(500).json({message:"Internal Server Error"})
        console.log(error);

    }

}
// ? LOGOUT ? \\




// ? UPDATE PROFILE ? \\
export const UpdateUserProfile = async (req:Request,res:Response) => {
    try {
        const {fullName, email, profilePicture} = req.body;
        const userId = req.user?._id;
        
        // ? Check if user is authenticated ? \\
        if(!userId) {
            return res.status(401).json({message:"Unauthorized"});
        }
        
        // ? Validate inputs ? \\
        if(!fullName || fullName.length < 3) {
            return res.status(400).json({message:"Full Name Must Be At Least 3 Characters!"});
        }
        
        if(!email || !email.includes("@")) {
            return res.status(400).json({message:"Invalid Email Format!"});
        }
        
        if(!profilePicture) {
            return res.status(400).json({message:"Profile Picture Is Required!"});
        }
        
        // ? Check if email is already taken by another user ? \\
        const existingUser = await User.findOne({ email, _id: { $ne: userId } });
        if(existingUser) {
            return res.status(400).json({message:"Email Already In Use By Another Account!"});
        }
        
        // ? Upload image to Cloudinary ? \\
        const uploadedProfilePicture = await cloudinary.uploader.upload(profilePicture, {
            folder: "profile_pictures",
            transformation: [{ width: 500, height: 500, crop: "limit" }]
        });
        
        // ? Update user ? \\
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                fullName,
                email,
                profilePicture: uploadedProfilePicture.secure_url
            },
            {new: true}
        );
        
        if(!updatedUser) {
            return res.status(404).json({message:"User Not Found!"});
        }
        
        // ? Return updated user data ? \\
        return res.status(200).json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
// ? UPDATE PROFILE ? \\




// ? CHECK AUTHENTICATION ? \\
export const CheckAuthentication = async (req:Request,res:Response) => {

    try {

        res.status(200).json(req.user)

    } catch (error) {        
        if(error instanceof Error){
            res.status(500).json({message:"Something Went Wrong In Check Authentication !"})
            console.log(error.message);    
        }
    }

}   

// ? CHECK AUTHENTICATION ? \\
