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
io.on("connection",(socket:any) => {

    console.log(`User Connected ${socket.id}`);

    const userId = socket.handshake.auth.userId;

    if(userId) UserSocket[userId] = socket.id;

    // ? send events to all users ? \\
    io.emit("getOnlineUsers",Object.keys(UserSocket));

    socket.on("disconnect",() => {
        console.log(`User Disconnected ${socket.id}`);
        delete UserSocket[userId];
        io.emit("getOnlineUsers",Object.keys(UserSocket));
    })

})
// ? Socket Connection ? \\




export {io,server,app};
