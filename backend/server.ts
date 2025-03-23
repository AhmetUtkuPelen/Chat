import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import AuthenticationRouter from './Routes/AuthenticationRoutes';
import MessageRouter from './Routes/MessageRouter';
import {ConnectDataBase} from './DataBase/DataBase'
import {app,server} from './Socket/Socket';
import path from 'path';


// ? Config .env ? \\
dotenv.config();
// ? Config .env ? \\



// ? PORT ? \\
const port = process.env.PORT;
// ? PORT ? \\


const __dirname = path.resolve();


// ? Middlewares ? \\
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
// ? Middlewares ? \\



// ? Database Connection Function ? \\
ConnectDataBase();
// ? Database Connection Function ? \\




// ? API Routes ? \\
app.use('/api/auth',AuthenticationRouter)
app.use('/api/messages',MessageRouter)
// ? API Routes ? \\



// ? HOSTING ? \\
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get("*",(req:Request,res:Response) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
  })
}
// ? HOSTING ? \\


  
  // ? Start server ? \\
  server.listen(port, () => {
    console.log(`Server is up and running at http://localhost:${port}`);
  });
  // ? Start server ? \\