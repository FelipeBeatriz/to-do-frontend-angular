import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../components/created-task/created-task-model';
import { ApiTask } from './api-task';

@Injectable({
  providedIn: 'root',
})

export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/tasks';

  tasks = signal<Task[]>([]);

  loadTasks(): void {
    this.http.get<ApiTask[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.tasks.set(data.map((task) => this.normalizeTask(task)));
      },
      error: (error) => {
        console.error('Erro ao buscar tasks:', error);
      },
    });
  }

  addTask(title: string): Observable<ApiTask> {
    const taskData = {
      title,
      is_done: false,
    };

    return this.http.post<ApiTask>(this.apiUrl, taskData).pipe(
      tap({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          console.error('Erro ao adicionar tarefa:', error);
        },
      }),
    );
  }

  toggleTask(task: Task): void {
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
    );
  }

  private normalizeTask(task: ApiTask): Task {
    return {
      id: task.id,
      title: task.title,
      done: task.done ?? task.is_done ?? false,
    };
  }
}
