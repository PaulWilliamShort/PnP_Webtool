import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class RegisterComponent {
  user = {
    email: '',
    password: '',
    username: '',
    verificationToken: '',
  };

  register() {
    if (!this.user.email || !this.user.password || !this.user.username || !this.user.verificationToken) {
      alert('Please fill in all fields!');
      return;
    }
    console.log('User registered:', this.user);
    alert('Registration successful!');
  }
}
