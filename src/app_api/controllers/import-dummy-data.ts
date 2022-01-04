import TaskModel from '../models/task';
import UserModel from '../models/user';

const tasks = [
  {
    title: 'Assignment #1',
    description: 'Assignment #1 description goes here!',
    dueAt: new Date("02/01/2022 10:00:00"),
    remindAt: new Date("02/01/2022 14:00:00"),
    isCompleted: true,
  },
  {
    title: 'Assignment #2',
    description: 'Assignment #2 description goes here!',
    dueAt: new Date("02/02/2022 10:00:00"),
    remindAt: new Date("02/02/2022 14:00:00"),
    isCompleted: true,
  },
  {
    title: 'Assignment #3',
    description: 'Assignment #3 description goes here!',
    dueAt: new Date("02/03/2022 10:00:00"),
    remindAt: new Date("02/03/2022 14:00:00"),
    isCompleted: true,
  },
  {
    title: 'Assignment #4',
    description: 'Assignment #4 description goes here!',
    dueAt: new Date("02/04/2022 10:00:00"),
    remindAt: new Date("02/04/2022 14:00:00"),
    isCompleted: true,
  },
  {
    title: 'Assignment #5',
    description: 'Assignment #5 description goes here!',
    dueAt: new Date("02/05/2022 10:00:00"),
    remindAt: new Date("02/05/2022 14:00:00"),
    isCompleted: true,
  },
  {
    title: 'Assignment #6',
    description: 'Assignment #6 description goes here!',
    dueAt: new Date("02/06/2022 10:00:00"),
    remindAt: new Date("02/06/2022 14:00:00"),
    isCompleted: true,
  },
  {
    title: 'Assignment #7',
    description: 'Assignment #7 description goes here!',
    dueAt: new Date("02/07/2022 10:00:00"),
    remindAt: new Date("02/07/2022 14:00:00"),
    isCompleted: true,
  },
  {
    title: 'Assignment #8',
    description: 'Assignment #8 description goes here!',
    dueAt: new Date("02/08/2022 10:00:00"),
    remindAt: new Date("02/08/2022 14:00:00"),
    isCompleted: true,
  },
  {
    title: 'Assignment #9',
    description: 'Assignment #9 description goes here!',
    dueAt: new Date("02/09/2022 10:00:00"),
    remindAt: new Date("02/09/2022 14:00:00"),
    isCompleted: true,
  },
  {
    title: 'Assignment #10',
    description: 'Assignment #10 description goes here!',
    dueAt: new Date("02/10/2022 10:00:00"),
    remindAt: new Date("02/10/2022 14:00:00"),
    isCompleted: true,
  },
]

export const importUser = () => {
  const user = new UserModel({
    email: 'test@test.com',
  });

  user.setPassword('123456');

  user.save((error: any, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Registered user with email ${registeredUser.email}`);
    }
  });
}

export const importTasks = () => {
  tasks.forEach(item => {
    const task = new TaskModel(item);

    task.save((error, newTask) => {
      if (error) {
        console.log(error);
      } else {
        console.log(newTask);
      }
    });
  });
}