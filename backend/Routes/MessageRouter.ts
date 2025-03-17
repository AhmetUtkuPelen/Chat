import express, { Router } from 'express';
import { AuthenticationMiddleware } from '../Middlewares/AuthenticationMiddleware';
import { DisplayUsersOnTopBar,GetMessages,SendMessages } from '../Controllers/MessagesController';


const MessageRouter: Router = express.Router();


MessageRouter.get('/users',AuthenticationMiddleware as express.RequestHandler,DisplayUsersOnTopBar as express.RequestHandler);
MessageRouter.get('/:id',AuthenticationMiddleware as express.RequestHandler,GetMessages as express.RequestHandler);
MessageRouter.get('/sendMessage/:id',AuthenticationMiddleware as express.RequestHandler,SendMessages as express.RequestHandler);



export default MessageRouter;