import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { NativeError as MongooseError} from "mongoose";

import UserModel, { UserInterface } from "../models/user";

// used to serialize the user for the session
passport.serializeUser((user: Express.User, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

// used to deserialize the user
passport.deserializeUser((id: string, done: (err: any, user?: false | Express.User | null | undefined) => void) => {
  UserModel.findById(id, (err: MongooseError, user: Express.User) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    (req, email, password, done) => {
      if (email) {
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
      }

      // asynchronous
      process.nextTick(() => {
        UserModel.findOne({ email }, (err: MongooseError, user: UserInterface) => {
          // if there are any errors, return the error
          if (err) {
            return done(err);
          }

          // if no user is found, return the message
          if (!user) {
            return done(null, false, { message: "user not found" });
          }

          if (!user.validatePassword(password)) {
            return done(null, false, { message: "wrong password" });
          } else {
            // all is well, return user
            if (user.accountStatus == "terminated") {
              return done(null, false, { message: "account terminated" });
            } else {
              const token = user.generateJwt();
              user.token = token;

              return done(null, user);
            }
          }
        });
      });
    }
  )
);

export default passport;