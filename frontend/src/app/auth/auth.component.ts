import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  // 👇 true = login mode, false = register mode
  isLogin = true;

  // 👇 Данные формы
  formData = {
    username: '',
    password: ''
  };

  // 👇 Переключение между login и register
  toggleMode() {
    this.isLogin = !this.isLogin;
    this.formData = { username: '', password: '' }; // очистка полей
  }

  // 👇 Обработка отправки формы
  onSubmit() {
    if (!this.formData.username || !this.formData.password) {
      console.log('⚠️ Пожалуйста, заполните все поля.');
      return;
    }

    if (this.isLogin) {
      console.log('🔐 Login данные:', this.formData);
    } else {
      console.log('📝 Register данные:', this.formData);
    }
  }
}
