import { Component } from '@angular/core';
import { UserCreateDto } from '../auth.model';
import { AuthService } from '../../services/auth-Service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
   user: UserCreateDto = { fullName: '', email: '', role: '' };
  message = '';

  constructor(private authService: AuthService) {}

  signUp() {
    this.authService.signUp(this.user).subscribe({
      next: res => {
        this.user={
           fullName: '', email: '', role: '' 
        }
        this.message = 'Signup successful!';
        console.log(res);
      },
      error: err => {
        this.message = 'Signup failed: ' + err.error;
      }
    });
  }

}
