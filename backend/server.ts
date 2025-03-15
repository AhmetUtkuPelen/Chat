import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import AuthenticationRouter from './Routes/AuthenticationRoutes';
import {ConnectDataBase} from './DataBase/DataBase'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 9999;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());


// Database Connection
ConnectDataBase();


// Routes
app.use('/api/auth',AuthenticationRouter)
  
  // Start server
  app.listen(port, () => {
    console.log(`Server is up and running at http://localhost:${port}`);
  });