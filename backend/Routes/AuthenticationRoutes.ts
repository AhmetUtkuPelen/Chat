import {Router} from 'express';
import express from 'express';
import {Register,Login,LogOut} from '../Controllers/AuthenticationController';

const AuthenticationRouter:Router = express.Router();


AuthenticationRouter.post('/register',Register)
AuthenticationRouter.post('/login',Login)
AuthenticationRouter.post('/logout',LogOut)


export default AuthenticationRouter;