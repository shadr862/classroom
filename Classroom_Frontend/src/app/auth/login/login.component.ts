import { Component } from '@angular/core';
import { UserLoginDto } from '../auth.model';
import { AuthService } from '../../services/auth-Service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials: UserLoginDto = { email: '' };
  message = '';

  constructor(private authService: AuthService, private route: Router) { }

  login() {
    this.authService.Login(this.credentials.email).subscribe({
      next: res => {
      
        this.message = `Welcome, ${res.fullName}!`;
        
        localStorage.setItem('userId', res.id);
        localStorage.setItem('email', res.email);
        localStorage.setItem('fullName', res.fullName);
        localStorage.setItem('role', res.role);

        this.route.navigate([`dashboard`]);
      },
      error: err => {
        this.message = 'Login failed: ' + err.error;
      }
    });
  }

}
