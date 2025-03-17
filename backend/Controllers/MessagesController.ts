import {Request, Response} from 'express';
import User from '../Models/UserModel';
import Message from '../Models/MessageModel';
import cloudinary from '../Cloudinary/Cloudinary';




// ? DISPLAY USERS ON TOP BAR ? \\
export const DisplayUsersOnTopBar = async (req:Request,res:Response) => {

    try {
        
        const LoggedInUser = req.user?._id;

        const FilteredUsers = await User.find({_id : {$ne:LoggedInUser} }).select('-password');

        res.status(200).json(FilteredUsers);

    } catch (error) {

        if(error instanceof Error){
            res.status(500).json({message:"Internal Server Error"});
            console.log(error);
        }

    }

}
// ? DISPLAY USERS ON TOP BAR ? \\




// ? GET MESSAGES ? \\
export const GetMessages = async (req:Request,res:Response) => {

    try {
        
        const {id:userToChatId} = req.params;

        const SenderId = req.user?._id;

        const messages = await Message.find({
            $or:[
                {senderId:SenderId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:SenderId}
            ]
        }).sort({createdAt:1}).exec();

        res.status(200).json(messages);

    } catch (error) {
        
        if(error instanceof Error){
            res.status(500).json({message:"Internal Server Error"});
            console.log(error);
        }

    }

}
// ? GET MESSAGES ? \\




// ? SEND MESSAGES ? \\
export const SendMessages = async (req:Request,res:Response) => {

    try {
        
        const {text,image} = req.body;

        const {id:userToChatId} = req.params;

        const SenderId = req.user?._id;

        let ImageUrl;

        if(image){
            // ? Upload image to Cloudinary ? \\
            const uploadResponse = await cloudinary.uploader.upload(image);
            ImageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId:SenderId,
            receiverId:userToChatId,
            text,
            image:ImageUrl
        })

        await newMessage.save();

        res.status(200).json(newMessage);

    } catch (error) {
        
        if(error instanceof Error){
            res.status(500).json({message:"Internal Server Error"});
            console.log(error);
        }

    }

}
// ? SEND MESSAGES ? \\