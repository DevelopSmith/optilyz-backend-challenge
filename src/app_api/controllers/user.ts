import { Request, Response } from 'express';
import { HydratedDocument } from "mongoose";
import { UserInterface } from '../models/user';
import { authorify, AuthorifyInterface, sendResJSON } from "../utilities";

import UserModel from '../models/user';

export const register = (req: Request, res: Response) => {
  const { email, password } = req.body;

  UserModel.findOne({ email: email }, (err: Error, user: UserInterface) => {
    if (err) {
      sendResJSON(res, 400, err);
    }

    if (user) {
      sendResJSON(res, 400, "This email already exists");
    } else {
      const user: HydratedDocument<UserInterface> = new UserModel({
        email: email.toLowerCase(),
      });

      user.setPassword(password);

      user.save((error, registeredUser) => {
        if (error) {
          sendResJSON(res, 400, error);
        } else {
          sendResJSON(res, 200, {
            id: registeredUser.id,
            email: registeredUser.email,
            registeredOn: registeredUser.registeredOn,
          });
        }
      });
    }
  });
};

export const getCurrentUser = (req: Request, res: Response) => {
  authorify(req, res, ({ userId }: AuthorifyInterface) => {
    UserModel.findById(userId)
      .select("-hash -salt -__v")
      .exec((err, user) => {
        if (err) {
          sendResJSON(res, 400, err);
        } else {
          sendResJSON(res, 200, user);
        }
      });
  });
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  authorify(req, res, ({ userRole }: AuthorifyInterface) => {
    if (userRole === "admin") {
      UserModel.findById(id)
        .select("-hash -salt -__v")
        .exec((err, user) => {
          if (err) {
            sendResJSON(res, 400, err);
          } else {
            sendResJSON(res, 200, user);
          }
        });
    }
  });
};

export const getUsers = (req: Request, res: Response) => {
  authorify(req, res, ({ userRole }: AuthorifyInterface) => {
    if (userRole === "admin") {
      UserModel.find()
        .select("-hash -salt -__v")
        .exec((err, users) => {
          if (err) {
            sendResJSON(res, 400, err);
          } else {
            sendResJSON(res, 200, users);
          }
        });
    }
  });
};
