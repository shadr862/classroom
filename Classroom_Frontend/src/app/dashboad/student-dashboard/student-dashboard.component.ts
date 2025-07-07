import { Component } from '@angular/core';
import { ClassroomList } from '../classroom.model';
import { ClassRoomService } from '../../services/classroom-Service/class-room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClassroomEnrollmentService } from '../../services/ClassroomEnrollment-Service/classroom-enrollment.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent {
  joinedClasses: (ClassroomList & { joinedAt?: Date })[] = [];
  showJoinModal = false;
  confirmUnenrollModal = false;
  accessCode = '';
  message = '';
  isSuccess = true;
  selectedClass: ClassroomList | null = null;

  constructor(private classService: ClassRoomService,
    private classroomEnrollmentService: ClassroomEnrollmentService) {}

  ngOnInit(): void {
    this.loadJoinedClasses();
  }

  loadJoinedClasses() {
    const studentId = localStorage.getItem('userId')!;
    this.classroomEnrollmentService.getEnrolledClasses(studentId).subscribe({
      next: (res) => {
        this.joinedClasses = res;
      },
      error: () => {
        this.message = 'Failed to load joined classes.';
        this.isSuccess = false;
      },
    });
  }

  openJoinModal() {
    this.showJoinModal = true;
    this.message = '';
    this.isSuccess = true;
    this.accessCode = '';
  }

  closeJoinModal() {
    this.showJoinModal = false;
   setTimeout(() => {
      this.message = '';
    }, 3000);
    this.accessCode = '';
  }

  joinClass() {
  if (!this.accessCode.trim()) {
    this.message = 'Please enter a valid access code.';
    this.isSuccess = false;
    return;
  }

  const studentId = localStorage.getItem('userId')!;
  this.classroomEnrollmentService.joinClassWithCode(this.accessCode, studentId).subscribe({
    next: (res) => {
      this.message = res.message || `Successfully joined class`;
      this.isSuccess = true;
      this.loadJoinedClasses(); // Refresh the list of joined classes
      this.closeJoinModal();
    },
    error: (err) => {
      const errorMessage = err.error?.message || 'Failed to join class. Please check the access code or try again.';
      this.message = errorMessage;
      this.isSuccess = false;
    }
  });
}


  openUnenrollModal(c: ClassroomList) {
    this.selectedClass = c;
    this.confirmUnenrollModal = true;
    this.message = '';
  }

  cancelUnenroll() {
    this.selectedClass = null;
    this.confirmUnenrollModal = false;
    setTimeout(() => {
      this.message = '';
    }, 3000); 
    
  }

  confirmUnenroll() {
    if (!this.selectedClass) return;

    const studentId = localStorage.getItem('userId')!;
    this.classroomEnrollmentService.unenrollFromClass(this.selectedClass.id,studentId).subscribe({
      next: () => {
        this.message = `You have left the class: ${this.selectedClass?.className}`;
        this.isSuccess = true;
        this.joinedClasses = this.joinedClasses.filter(c => c.id !== this.selectedClass?.id);
        this.cancelUnenroll();
      },
      error: () => {
        this.message = 'Failed to leave the class.';
        this.isSuccess = false;
      }
    });
  }

  getRandomColor(key: string): string {
    const colors = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#673ab7'];
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }
}
