import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {AuthService} from '../services/auth.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    try {
      const response = await firstValueFrom(this.authService.login(this.username, this.password));
      this.authService.saveToken(response.token);
      this.router.navigate(['/profile']);
    } catch (error) {
      this.errorMessage = 'Login fehlgeschlagen!';
      console.error('Fehler beim Login:', error);
    }
  }
}
