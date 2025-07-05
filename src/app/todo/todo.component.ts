import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div style="min-height: 100vh; background-color: white; display: flex; justify-content: center; align-items: center; padding: 2rem;">
    <div style="background-color: #38bdf8; box-shadow: 0 10px 25px rgba(0,0,0,0.2); border-radius: 1rem; width: 100%; max-width: 800px; padding: 2rem;">
      <h2 style="color: white; font-size: 2rem; font-style: italic; text-align: center; text-decoration: underline; margin-bottom: 1.5rem;">
        My To Do List
      </h2>
      <table style="width: 100%; border-collapse: collapse; color: white; font-family: system-ui;">
        <thead>
          <tr style="border-bottom: 2px solid white;">
            <th *ngFor="let day of days" style="border-right: 1px solid white; padding: 0.75rem; text-align: center; font-size: 1.25rem;">
              {{ day }}
              <div style="margin-top: 0.5rem;">
                <input [(ngModel)]="newTodos[day]" placeholder="Add task" style="width: 100%; padding: 0.3rem; border-radius: 4px; border: none; font-size: 0.9rem;" />
                <button (click)="addTodo(day)" 
                  style="margin-top: 0.25rem; width: 100%; background-color: white; color: black; border-radius: 20px; border: none; cursor: pointer; font-size: 0.85rem; display: block; margin-left: auto; margin-right: auto; padding: 0.5rem 0;">
                  Add
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let rowIndex of [0,1,2,3,4,5]">
            <td *ngFor="let day of days" style="border-right: 1px solid white; border-bottom: 1px solid white; padding: 0.75rem; vertical-align: top;">
              <div *ngIf="todos[day][rowIndex]" style="display: flex; justify-content: space-between; align-items: center;">
                <span>{{ todos[day][rowIndex] }}</span>
                <button (click)="deleteTodo(day, rowIndex)" style="background: none; border: none; color: #ff6666; cursor: pointer; font-weight: bold; font-size: 1rem;">❌</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `
})
export class TodoComponent {
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  todos: Record<string, string[]> = {};
  newTodos: Record<string, string> = {};

  constructor() {
    this.days.forEach(day => {
      this.todos[day] = [];
      this.newTodos[day] = '';
    });
  }

  addTodo(day: string) {
    const task = this.newTodos[day]?.trim();
    if (task) {
      this.todos[day].push(task);
      this.newTodos[day] = '';
    }
  }

  deleteTodo(day: string, index: number) {
    this.todos[day].splice(index, 1);
  }
}
