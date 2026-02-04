import { Component, input, output, signal, viewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-text',
  imports: [FormsModule],
  templateUrl: './editable-text.html',
})
export class EditableText {
  value = input.required<string>();
  isStrikethrough = input<boolean>(false);

  valueChanged = output<string>();
  editingStateChanged = output<boolean>();

  isEditing = signal(false);
  editedValue = signal('');
  inputRef = viewChild<ElementRef<HTMLInputElement>>('textInput');

  startEdit(): void {
    this.editedValue.set(this.value());
    this.isEditing.set(true);
    this.editingStateChanged.emit(true);
    setTimeout(() => {
      this.inputRef()?.nativeElement.focus();
    });
  }

  saveEdit(): void {
    const newValue = this.editedValue().trim();
    if (newValue && newValue !== this.value()) {
      this.valueChanged.emit(newValue);
    }
    this.isEditing.set(false);
    this.editingStateChanged.emit(false);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    this.editedValue.set('');
    this.editingStateChanged.emit(false);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.saveEdit();
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }
}
