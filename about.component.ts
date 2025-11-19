import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="about-page">
      <h1>О приложении</h1>
      <p>Это простое Todo-приложение, созданное на Angular.</p>
      <p>Функциональность:</p>
      <ul>
        <li>Добавление задач</li>
        <li>Отметка выполнения</li>
        <li>Фильтрация задач</li>
        <li>Локальное сохранение</li>
      </ul>
    </div>
  `,
  // styleUrls: ['./about.component.css']
})
export class AboutComponent {}