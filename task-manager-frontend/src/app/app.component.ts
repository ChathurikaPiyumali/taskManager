import { Component, ViewChild } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { Task } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-manager-frontend';

  // Reference to TaskListComponent to refresh the list
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  // Task currently being edited
  taskToEdit: Task | null = null;

  // Triggered when a task is selected for editing
  onEditTask(task: Task): void {
    this.taskToEdit = task;
  }

  // Triggered when a task is saved (created or updated)
  onTaskSaved(): void {
    this.taskListComponent.fetchTasks(); // Refresh the list
    this.taskToEdit = null;              // Clear the form
  }
}
