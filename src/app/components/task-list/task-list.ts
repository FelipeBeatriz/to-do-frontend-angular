import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CreatedTask } from '../created-task/created-task';
import { Task } from '../created-task/created-task-model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [CreatedTask],
  templateUrl: './task-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskList implements OnInit {
  private taskService = inject(TaskService);
  tasks = this.taskService.tasks;

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  refreshTasks(): void {
    this.taskService.loadTasks();
  }

  toggleTask(task: Task): void {
    this.taskService.toggleTask(task);
  }
}
