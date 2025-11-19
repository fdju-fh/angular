import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    });
  }

  get filteredTodos(): Todo[] {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  onTodoAdded(todo: Omit<Todo, 'id' | 'createdAt'>): void {
    this.todoService.addTodo(todo);
  }

  onTodoToggled(id: number): void {
    this.todoService.toggleTodo(id);
  }

  onTodoEdited(todo: Todo): void {
    // Реализация редактирования
    console.log('Edit todo:', todo);
  }

  onTodoDeleted(id: number): void {
    this.todoService.deleteTodo(id);
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
  }

  get stats() {
    const total = this.todos.length;
    const completed = this.todos.filter(t => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }
}