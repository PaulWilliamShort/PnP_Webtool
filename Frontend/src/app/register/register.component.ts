import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    role: 'player',
  };
  constructor(private http: HttpClient) {}
  
  toggleRole() {
    this.user.role = this.user.role === 'player' ? 'gm' : 'player';
    console.log("Aktuelle Rolle:", this.user.role); // Debugging
  }
  

  register() {
    if (!this.user.email || !this.user.password || !this.user.username || !this.user.verificationToken) {
      alert('Please fill in all fields!');
      return;
    }
    console.log("Sende folgende Daten:", this.user); // Debugging
    
    this.http.post('http://localhost:5000/api/auth/register', this.user).subscribe(
      (response) => {
        console.log('User registered:', response);
        alert('Registration successful!');
      },
      (error) => {
        console.error('Registration error:', error);
        alert('Registration failed: ' + (error.error?.error || 'Unknown error'));
      }
    );
  }
}