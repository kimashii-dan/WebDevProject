import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  formData = {
    username: '',
    password: ''
  };

  onSubmit() {
    console.log('Все данные с формы:', this.formData);
  }
}
