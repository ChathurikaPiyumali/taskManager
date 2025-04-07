import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For ngModel support
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;
  statusFilter: string = ''; // For filtering by status

  @Output() editTask = new EventEmitter<Task>(); // Emits task to parent
  @Input() taskToEdit: Task | null = null;       // For highlighting or future use

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
        this.loading = false;
      }
    });
  }

  get filteredTasks(): Task[] {
    if (!this.statusFilter) return this.tasks;
    return this.tasks.filter(task => task.status === this.statusFilter);
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
    }
  }

  onEdit(task: Task): void {
    this.editTask.emit(task); // ✅ Correct use of EventEmitter
  }
}
