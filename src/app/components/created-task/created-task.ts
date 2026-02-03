import { Component, input, output } from '@angular/core';
import { Task } from './created-task-model';

@Component({
  selector: 'app-created-task',
  imports: [],
  templateUrl: './created-task.html',
})
export class CreatedTask {
  task = input.required<Task>();
  taskToggled = output<Task>();

  onToggle(): void {
    this.taskToggled.emit(this.task());
  }
}
