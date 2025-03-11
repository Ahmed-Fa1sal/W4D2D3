import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../services/task.service';
import * as TaskActions from '../state/task.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  // Load tasks
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks }))
        )
      )
    )
  );

  // Add Task
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap(action =>
        this.taskService.addTask(action.task).pipe(
          map(task => TaskActions.addTaskSuccess({ task }))
        )
      )
    )
  );

  // Update Task
  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(action =>
        this.taskService.updateTask(action.task).pipe(
          map(() => TaskActions.updateTaskSuccess({ task: action.task }))
        )
      )
    )
  );

  // Delete Task
  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(action =>
        this.taskService.deleteTask(action.id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id: action.id }))
        )
      )
    )
  );
}
