import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public todos$ = this.todosSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Omit<Todo, 'id' | 'createdAt'>): void {
    const newTodo: Todo = {
      ...todo,
      id: Date.now(),
      createdAt: new Date()
    };
    this.todos.push(newTodo);
    this.update();
  }

  updateTodo(id: number, updates: Partial<Todo>): void {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...updates };
      this.update();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.update();
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.update();
    }
  }

  private update(): void {
    this.todosSubject.next([...this.todos]);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem('todos');
    if (stored) {
      this.todos = JSON.parse(stored);
      this.todosSubject.next([...this.todos]);
    }
  }
}