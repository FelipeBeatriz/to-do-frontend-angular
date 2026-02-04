import { Component, signal } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Dashboard } from './components/dashboard/dashboard';
import { TaskList } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  imports: [Hero, Dashboard, TaskList],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('todo_frontend');
}
