import express, { Request, Response, NextFunction, Application } from 'express';
import http, { Server } from 'http';
import createError, { HttpError } from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import connectDB from './app_api/models/db';
connectDB();

import { normalizePort, onConnectionError, onConnectionListening } from './app_api/utilities/helpers';
import apiRouter from './app_api/routes/index';
import indexRouter from './app_server/routes/index';
import passport from './app_api/config/passport';

// load the environment variables
dotenv.config();

const app: Application = express();

// view engine setup
app.set('views', path.join(__dirname, './app_server/views'));
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use((req: Request, res: Response, next: NextFunction) => {
	// Website we wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods we wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers we wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

	// Pass to next layer of middleware
	next();
});

app.use(session({
	secret: process.env.SESSION_SECRET || '',
	store: new MongoStore({
		mongoUrl: process.env.DATABASE_URI,
	}),
	cookie: {
		maxAge: 604800000 // one week
	},
	saveUninitialized: false,
	resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

// Create HTTP server.
const server: Server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', (error: HttpError) => onConnectionError(error, port));
server.on('listening', () => onConnectionListening(server));

export default app;
