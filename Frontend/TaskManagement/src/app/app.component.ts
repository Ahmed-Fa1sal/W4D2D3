import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';
import * as TaskActions from './state/task.actions';
import { selectAllTasks } from './state/task.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private store: Store) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }
}
