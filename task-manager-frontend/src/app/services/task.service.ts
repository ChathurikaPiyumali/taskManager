import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  // 🔍 Get all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // 📄 Get a task by ID
  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  // ➕ Create a new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // 🔁 Update existing task
  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  // ❌ Delete a task
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
