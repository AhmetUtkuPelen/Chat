import express, { Router } from 'express';
import { Login, LogOut, Register } from '../Controllers/AuthenticationController';

const AuthenticationRouter: Router = express.Router();


AuthenticationRouter.post('/register', Register as express.RequestHandler);
AuthenticationRouter.post('/login', Login as express.RequestHandler);
AuthenticationRouter.post('/logout', LogOut as express.RequestHandler);

export default AuthenticationRouter;