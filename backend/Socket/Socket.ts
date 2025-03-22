import {Server} from 'socket.io'
import http from 'http'
import express from 'express'


const app:express.Application = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST","PUT","DELETE"]
    }
})


// ? Online Users ? \\
const userSocket: Record<string, string> = {};


io.on("connection",(socket:any) => {

    console.log(`User Connected ${socket.id}`);

    const userId = socket.handshake.auth.userId;

    if(userId) userSocket[userId] = socket.id;

    // ? send events to all users ? \\
    io.emit("getOnlineUsers",Object.keys(userSocket));

    socket.on("disconnect",() => {
        console.log(`User Disconnected ${socket.id}`);
        delete userSocket[userId];
        io.emit("getOnlineUsers",Object.keys(userSocket));
    })

})




export {io,server,app};
