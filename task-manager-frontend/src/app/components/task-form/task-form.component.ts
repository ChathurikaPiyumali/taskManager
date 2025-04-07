import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {
  @Input() taskToEdit: Task | null = null;
  @Output() taskSaved = new EventEmitter<void>();

  taskForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['TO_DO']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit']) {
      if (this.taskToEdit) {
        // Switching into edit mode
        this.isEditMode = true;
        this.taskForm.patchValue(this.taskToEdit);
      } else {
        // Task was reset to null — reset form for create mode
        this.resetForm();
      }
    }
  }

  submitForm(): void {
    if (this.taskForm.valid) {
      const formValue: Task = this.taskForm.value;

      if (this.isEditMode && this.taskToEdit?.id) {
        // Edit mode
        this.taskService.updateTask(this.taskToEdit.id, formValue).subscribe(() => {
          this.taskSaved.emit();
          this.resetForm();
        });
      } else {
        // Create mode
        this.taskService.createTask(formValue).subscribe(() => {
          this.taskSaved.emit();
          this.resetForm();
        });
      }
    }
  }

  resetForm(): void {
    this.taskForm.reset({ title: '', description: '', status: 'TO_DO' });
    this.isEditMode = false;
    this.taskToEdit = null;
  }
}
