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



io.on("connection",(socket:any) => {

    console.log(`User Connected ${socket.id}`);

    socket.on("disconnect",() => {
        console.log(`User Disconnected ${socket.id}`);
    })

})




export {io,server,app};