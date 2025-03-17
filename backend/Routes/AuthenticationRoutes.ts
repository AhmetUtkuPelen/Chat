import express, { Router } from 'express';
import { CheckAuthentication, Login, LogOut, Register, UpdateUserProfile } from '../Controllers/AuthenticationController';
import {AuthenticationMiddleware} from '../Middlewares/AuthenticationMiddleware';

const AuthenticationRouter: Router = express.Router();


AuthenticationRouter.post('/register', Register as express.RequestHandler);
AuthenticationRouter.post('/login', Login as express.RequestHandler);
AuthenticationRouter.post('/logout', LogOut as express.RequestHandler);
AuthenticationRouter.put('/updateProfile', AuthenticationMiddleware as express.RequestHandler ,UpdateUserProfile as express.RequestHandler);
AuthenticationRouter.get('/check-authentication', AuthenticationMiddleware as express.RequestHandler, CheckAuthentication as express.RequestHandler);



export default AuthenticationRouter;