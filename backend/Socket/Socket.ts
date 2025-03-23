import {Server} from 'socket.io'
import http from 'http'
import express from 'express'


// ? Server ? \\
const app:express.Application = express();
const server = http.createServer(app);
// ? Server ? \\


// ? Socket ? \\
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST","PUT","DELETE"]
    }
})
// ? Socket ? \\


// ? Online Users ? \\
const UserSocket: Record<string, string> = {};
// ? Online Users ? \\


// ? Get Socket Id ? \\
export const GetSocketId = async (userId:string) => {

    return UserSocket[userId];

}
// ? Get Socket Id ? \\


// ? Socket Connection ? \\
io.on("connection", (socket: any) => {
    console.log(`User Connected ${socket.id}`);

    const userId = socket.handshake.auth.userId;
    console.log("User connected with ID:", userId);

    if(!userId) {
        console.log("No user ID provided, disconnecting socket");
        socket.disconnect();
        return;
    }

    // Store the user's socket ID
    UserSocket[userId] = socket.id;
    console.log("Updated UserSocket map:", UserSocket);

    // Broadcast online users to all clients
    const onlineUsers = Object.keys(UserSocket);
    console.log("Broadcasting online users:", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`User Disconnected ${socket.id} with ID ${userId}`);
        delete UserSocket[userId];
        console.log("Updated UserSocket map after disconnect:", UserSocket);
        io.emit("getOnlineUsers", Object.keys(UserSocket));
    });
}); // ? Socket Connection ? \\


export {io,server,app};
