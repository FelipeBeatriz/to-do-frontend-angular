import { Component, signal } from '@angular/core';
import { Hero } from "./components/hero/hero";
import { Dashboard } from "./components/dashboard/dashboard";

@Component({
  selector: 'app-root',
  imports: [Hero, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo_frontend');
}
