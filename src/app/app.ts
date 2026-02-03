import { Component, signal, viewChild } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Dashboard } from './components/dashboard/dashboard';
import { TaskList } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [Hero, Dashboard, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('todo_frontend');
  taskList = viewChild.required(TaskList);

  onTaskAdded(): void {
    this.taskList().refreshTasks();
  }
}
