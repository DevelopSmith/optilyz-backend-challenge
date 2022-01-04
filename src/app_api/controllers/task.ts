import { Request, Response } from 'express';
import { HydratedDocument } from "mongoose";
import { authorify, sendResJSON } from "../utilities";

import TaskModel, { TaskInterface } from '../models/task';
import tasksTableProps from '../static_content/tasks_table';

export const getTasksTableProps = (req: Request, res: Response) => {
  sendResJSON(res, 200, tasksTableProps);
}

export const createTask = (req: Request, res: Response) => {
  authorify(req, res, () => {
    const params = req.body;

    const task: HydratedDocument<TaskInterface> = new TaskModel({
      title: params.title,
      description: params.description,
      dueAt: new Date(params.dueAt),
      remindAt: new Date(params.remindAt),
    });

    task.save((error, newTask) => {
      if (error) {
        sendResJSON(res, 400, error);
      } else {
        sendResJSON(res, 200, newTask);
      }
    });
});
};

export const getTask = (req: Request, res: Response) => {
  const { id } = req.params;

  authorify(req, res, () => {
    TaskModel.findById(id)
      .exec((err, task) => {
        if (err) {
          sendResJSON(res, 400, err);
        } else {
          sendResJSON(res, 200, task);
        }
      });
  });
};

export const getTasks = (req: Request, res: Response) => {
  authorify(req, res, () => {
    TaskModel.find()
      .exec((err, tasks) => {
        if (err) {
          sendResJSON(res, 400, err);
        } else {
          sendResJSON(res, 200, tasks);
        }
      });
  });
};

export const updateTask = (req: Request, res: Response) => {
  authorify(req, res, async () => {
    const { id } = req.params;
    const params = req.body;

    try {
      const updatedTask = await TaskModel.findOneAndUpdate(
        { id },
        {
          ...params,
          updatedAt: new Date(),
        },
      );

      sendResJSON(res, 200, updatedTask);
    } catch (err) {
      sendResJSON(res, 400, err);
    }
  });
};

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params;

  authorify(req, res, async () => {
    try {
      await TaskModel.deleteOne({ id });
      sendResJSON(res, 200, id);
    } catch (err) {
      sendResJSON(res, 400, err);
    }
  });
};

export const getFilteredTasks = (req: Request, res: Response) => {
  authorify(req, res, async () => {
    const { limit = 5, page = 0 } = req.query;
    let count: number;

    try {
      count = await TaskModel.count();
    } catch (e) {
      sendResJSON(res, 400, e);
    }

    TaskModel.find()
      .sort('createdOn')
      .skip(Number(page) * Number(limit))
      .limit(Number(limit))
      .exec((err, tasks) => {
        if (err) {
          sendResJSON(res, 400, err);
        } else {
          sendResJSON(res, 200, {
            tasks,
            total: count,
            page: Number(page) + 1,
          });
        }
      });
  });
};

