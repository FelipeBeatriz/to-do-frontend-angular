import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AmountBox } from '../amount-box/amount-box';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  imports: [AmountBox],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private taskService = inject(TaskService);
  taskInput = signal('');
  hasText = computed(() => this.taskInput().trim().length > 0);
  tasks = this.taskService.tasks;
  totalCount = computed(() => this.tasks().length);
  doneCount = computed(() => this.tasks().filter((task) => task.done).length);
  pendingCount = computed(() => this.tasks().filter((task) => !task.done).length);

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.taskInput.set(input.value);
  }

  addTask() {
    const task = this.taskInput();

    if (!task.trim()) {
      return;
    }

    this.taskService.addTask(task).subscribe({
      next: () => {
        this.taskInput.set('');
      },
    });
  }
}
