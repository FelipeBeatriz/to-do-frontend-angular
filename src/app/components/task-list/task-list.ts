import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatedTask } from '../created-task/created-task';
import { Task } from '../created-task/created-task-model';

@Component({
  selector: 'app-task-list',
  imports: [CreatedTask],
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  private http = inject(HttpClient);
  tasks = signal<Task[]>([]);

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.http.get<Task[]>('http://localhost:3000/tasks').subscribe({
      next: (data) => {
        this.tasks.set(data);
      },
      error: (error) => {
        console.error('Erro ao buscar tasks:', error);
      },
    });
  }

  refreshTasks(): void {
    this.getTasks();
  }

  toggleTask(task: Task): void {
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
    );
  }
}
