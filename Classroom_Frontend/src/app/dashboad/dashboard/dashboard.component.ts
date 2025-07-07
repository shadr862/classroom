import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClassRoomService } from '../../services/classroom-Service/class-room.service';
import { AuthService } from '../../services/auth-Service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  user = {
    fullName: localStorage.getItem('fullName'),
    role: localStorage.getItem('role')
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(this.user.role=='student')
    {
      this.router.navigateByUrl('/dashboard/student')
    }
    else
    {
       this.router.navigateByUrl('/dashboard/teacher')
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
