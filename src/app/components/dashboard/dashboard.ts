import { Component, inject, signal, computed, output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AmountBox } from '../amount-box/amount-box';

@Component({
  selector: 'app-dashboard',
  imports: [AmountBox],
  templateUrl: './dashboard.html',
})

export class Dashboard {
  private http = inject(HttpClient);
  taskInput = signal('');
  hasText = computed(() => this.taskInput().trim().length > 0);
  taskAdded = output<void>();

  private apiUrl = 'http://localhost:3000/tasks';

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.taskInput.set(input.value);
  }

  addTask() {
    const task = this.taskInput();

    if (!task.trim()) {
      return;
    }

    const taskData = {
      title: task,
      is_done: false,
    };

    this.http.post(this.apiUrl, taskData).subscribe({
      next: (response) => {
        console.log('Tarefa adicionada com sucesso:', response);
        this.taskInput.set('');
        this.taskAdded.emit();
      },
      error: (error) => {
        console.error('Erro ao adicionar tarefa:', error);
      },
    });
  }
}
