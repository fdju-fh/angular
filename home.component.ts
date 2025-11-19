import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-page">
      <h1>Мои задачи</h1>
      <app-todo-list></app-todo-list>
    </div>
  `,
  // styleUrls: ['./home.component.css']
})
export class HomeComponent {}