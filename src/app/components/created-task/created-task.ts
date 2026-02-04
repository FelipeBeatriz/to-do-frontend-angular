import { Component, input, output, inject, signal, viewChild } from '@angular/core';
import { Task } from './created-task-model';
import { TaskService } from '../../services/task.service';
import { EditableText } from '../editable-text/editable-text';
import { ConfirmModal } from '../confirm-modal/confirm-modal';

@Component({
  selector: 'app-created-task',
  imports: [EditableText, ConfirmModal],
  templateUrl: './created-task.html',
})
export class CreatedTask {
  task = input.required<Task>();
  taskToggled = output<Task>();
  taskService = inject(TaskService);

  editableTextRef = viewChild(EditableText);
  isEditing = signal(false);
  showDeleteModal = signal(false);

  onToggle(): void {
    this.taskToggled.emit(this.task());
  }

  onTitleChanged(newTitle: string): void {
    this.taskService.updateTaskTitle(this.task(), newTitle);
  }

  onEditingStateChanged(isEditing: boolean): void {
    this.isEditing.set(isEditing);
  }

  startEdit(): void {
    this.editableTextRef()?.startEdit();
  }

  saveEdit(): void {
    this.editableTextRef()?.saveEdit();
  }

  cancelEdit(): void {
    this.editableTextRef()?.cancelEdit();
  }

  openDeleteModal(): void {
    this.showDeleteModal.set(true);
  }

  confirmDelete(): void {
    this.taskService.deleteTask(this.task());
    this.showDeleteModal.set(false);
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
  }
}
