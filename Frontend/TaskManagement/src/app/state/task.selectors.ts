import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Task } from '../models/task.model';

// Define the state shape
export interface TaskState {
  tasks: Task[];
}

// Feature selector for tasks state
export const selectTaskState = createFeatureSelector<TaskState>('tasks');

// Selector to get all tasks
export const selectAllTasks = createSelector(
  selectTaskState,
  (state) => state.tasks
);

// Selector to get completed tasks
export const selectCompletedTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => task.completed)
);

// Selector to get pending tasks
export const selectPendingTasks = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(task => !task.completed)
);