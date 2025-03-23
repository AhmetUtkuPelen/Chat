import {Server, Socket} from 'socket.io'
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
io.on("connection", (socket: Socket) => {

    const userId = socket.handshake.auth.userId;

    if(!userId) {
        socket.disconnect();
        return;
    }

    // Store the user's socket ID
    UserSocket[userId] = socket.id;

    // Broadcast online users to all clients
    const onlineUsers = Object.keys(UserSocket);
    io.emit("getOnlineUsers", onlineUsers);

    // Handle disconnection
    socket.on("disconnect", () => {
        delete UserSocket[userId];
        io.emit("getOnlineUsers", Object.keys(UserSocket));
    });
}); // ? Socket Connection ? \\


export {io,server,app};
