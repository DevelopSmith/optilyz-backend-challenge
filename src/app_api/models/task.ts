import { Schema, model } from 'mongoose';

export interface TaskInterface {
  title: string;
  description: string;
  isCompleted: boolean;
  dueAt: Date;
  remindAt: Date;
  createdAt: Schema.Types.Date;
  updatedAt: Schema.Types.Date;
}

const taskSchema = new Schema<TaskInterface>({
	title: String,
	description: String,
	isCompleted: {
    type: Boolean,
    default: false,
  },
  dueAt: Date,
  remindAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<TaskInterface>('Task', taskSchema);