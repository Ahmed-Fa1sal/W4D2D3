import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TaskActions from './task.actions'; // import actions

export interface TaskState {
  tasks: Task[];
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TaskActions.updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t =>
      t.id === task.id ? { ...t, ...task } : t
    ),
  })),
  on(TaskActions.deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== id),
  }))
);
