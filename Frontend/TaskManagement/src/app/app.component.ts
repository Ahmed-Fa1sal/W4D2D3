import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Import necessary reactive forms modules
import { Task } from './models/task.model';
import * as TaskActions from './state/task.actions';
import { selectAllTasks } from './state/task.selectors';
import { CommonModule } from '@angular/common';
import { TaskService } from './services/task.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule  // Make sure ReactiveFormsModule is imported
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "TaskManagement";
  tasks$: Observable<Task[]>;
  taskForm?: FormGroup;  // Declare a form group for the reactive form
  newTaskTitle: string = '';  // Initialize the form control
  newTaskDescription: string = '';  // Initialize the form control

  constructor(
    private store: Store,
    private taskService : TaskService,
    private fb: FormBuilder  // Inject FormBuilder for creating the form
  ) {
    this.tasks$ = this.store.select(selectAllTasks);


  }

  ngOnInit(): void {
        // Initialize the form
        this.taskForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(3)]],  // Form control for title
          description: ['', [Validators.required, Validators.minLength(5)]],  // Form control for description
        });
    this.store.dispatch(TaskActions.loadTasks());
  }

  // Function to add a new task using the reactive form values
  addTask(): void {
    if (this.taskForm?.valid) {
      const newTask: Task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        completed: false,
      };
      this.store.dispatch(TaskActions.addTask({ task: newTask }));

      // Reset form after submitting
      this.taskForm.reset();
    }
  }

  // Function to delete a task
  deleteTask(taskId: string): void {
    this.store.dispatch(TaskActions.deleteTask({ id: taskId }));
  }

  // Function to update a task
  updateTask(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
  }
}
