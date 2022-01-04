import dotenv from 'dotenv';
import { Router, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'express-jwt';

import { register, getCurrentUser, getUsers, getUser } from '../controllers/user';
import { createTask, getTask, getTasks, updateTask, deleteTask, getFilteredTasks, getTasksTableProps } from '../controllers/task';

dotenv.config();
const router = Router();

const auth = jwt({
	secret: process.env.JWT_SECRET || '',
  algorithms: ['HS256'],
});

/* 
  User endpoints
  */

router.get('/user', auth, getCurrentUser);
router.get('/users', auth, getUsers);
router.get('/user/:id', auth, getUser);

/* 
  Task endpoints
  */

router.get('/tasks-table-props', getTasksTableProps);
router.post('/task', auth, createTask);
router.get('/tasks', auth, getTasks);
router.get('/filtered-tasks', auth, getFilteredTasks);
router.get('/task/:id', auth, getTask);
router.patch('/task/:id', auth, updateTask);
router.delete('/task/:id', auth, deleteTask);

/*
 * Authentication
 */
router.post('/register', register);

router.post('/login', passport.authenticate('local', {
	failureFlash : false,
}), (req: Request, res: Response) => {
	req.session.token = req.user?.token;
	res.status(200);
	res.json({ token: req.user?.token });
});

export default router;
