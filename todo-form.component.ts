import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Output() todoAdded = new EventEmitter<Omit<Todo, 'id' | 'createdAt'>>();
  
  todoForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      dueDate: ['']
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      const newTodo: Omit<Todo, 'id' | 'createdAt'> = {
        title: formValue.title,
        description: formValue.description,
        dueDate: formValue.dueDate ? new Date(formValue.dueDate) : undefined,
        completed: false
      };
      
      this.todoAdded.emit(newTodo);
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.todoForm.reset();
    this.isSubmitted = false;
  }

  get title() {
    return this.todoForm.get('title');
  }
}