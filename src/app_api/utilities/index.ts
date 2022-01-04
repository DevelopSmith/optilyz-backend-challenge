import { Request, Response } from 'express';
import UserModel from '../models/user';

export interface AuthorifyInterface {
	userId: string;
	userEmail: string;
	userRole?: string;
}

declare global {
	/* eslint-disable @typescript-eslint/no-namespace */
  namespace Express {
    interface User {
      _id: string;
			token: string;
    }
    interface Session {
			token: string;
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    token: string;
  }
}

export const sendResJSON = (res: Response, status: number, content: any) => {
	res.status(status);
	res.json(content);
};

export const authorify = (req: Request, res: Response, callback: (params: AuthorifyInterface) => void) => {
	if(req.user && req.user._id){
		const { _id: id } = req.user;

		UserModel
		.findById(id)
		.exec((err, user) => {
			if(!user){
				sendResJSON(res, 400, { message: 'user not found' });
				return;
			}else if(err){
				console.error(err);

				sendResJSON(res, 400, err);
				return;
			}
			
			callback({ userId: user._id, userEmail: user.email, userRole: user.role });
		});
	}else{
		sendResJSON(res, 400, { message: 'user not found' });
		return;
	}
};