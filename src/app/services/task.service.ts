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
      done: false,
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
    const updatedDone = !task.done;

    this.http
      .patch<ApiTask>(`${this.apiUrl}/${task.id}`, {
        done: updatedDone,
      })
      .subscribe({
        next: (updated) => {
          const normalized = updated ? this.normalizeTask(updated) : { ...task, done: updatedDone };
          this.tasks.update((tasks) => tasks.map((t) => (t.id === task.id ? normalized : t)));
        },
        error: (error) => {
          console.error('Erro ao atualizar tarefa:', error);
        },
      });
  }

  updateTaskTitle(task: Task, newTitle: string): void {
    this.http
      .patch<ApiTask>(`${this.apiUrl}/${task.id}`, {
        title: newTitle,
      })
      .subscribe({
        next: (updated) => {
          const normalized = updated ? this.normalizeTask(updated) : { ...task, title: newTitle };
          this.tasks.update((tasks) => tasks.map((t) => (t.id === task.id ? normalized : t)));
        },
        error: (error) => {
          console.error('Erro ao atualizar título da tarefa:', error);
        },
      });
  }

  private normalizeTask(task: ApiTask): Task {
    return {
      id: task.id,
      title: task.title,
      done: task.done ?? false,
    };
  }
}
