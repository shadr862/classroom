import { Component } from '@angular/core';
import { ClassroomCreate, ClassroomList } from '../classroom.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassRoomService } from '../../services/classroom-Service/class-room.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent {
  classrooms: ClassroomList[] = [];
  newClass: ClassroomCreate = {
    className: '',
    description: '',
    teacherId: localStorage.getItem('userId') || ''
  };

  confirmDeleteModal = false;
  selectedClass: ClassroomList | null = null;

  message = '';
  showModal = false;
  isSuccess = false;

  constructor(private classService: ClassRoomService) { }

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    const teacherId = localStorage.getItem('userId')!;
    this.classService.getClassroomsByTeacher(teacherId).subscribe(res => {
      this.classrooms = res;
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

  openModal() {
    this.showModal = true;
    this.message = '';
  }

  closeModal() {
    this.showModal = false;

    // Automatically clear the success message after 3 seconds
    setTimeout(() => {
      this.message = '';
    }, 3000); // 3000 ms = 3 seconds
  }


  createClass() {
    this.newClass.teacherId = localStorage.getItem('userId') || '';
    this.classService.createClassroom(this.newClass).subscribe({
      next: () => {
        this.message = '✅ Class created successfully!';
        this.newClass.className = '';
        this.newClass.description = '';
        this.isSuccess = true;
        this.loadClasses();
        this.closeModal();
      },
      error: () => {
        this.message = '❌ Failed to create class.';
        this.isSuccess = false;
      }
    });
  }


  openDeleteModal(c: ClassroomList) {
  this.selectedClass = c;
  this.confirmDeleteModal = true;
}

cancelDelete() {
  this.selectedClass = null;
  this.confirmDeleteModal = false;
}

confirmDelete() {
  if (!this.selectedClass) return;

  this.classService.deleteClassroom(this.selectedClass.id).subscribe({
    next: () => {
      this.message = '✅ Class deleted successfully.';
      this.isSuccess = true;
      this.loadClasses();
    },
    error: () => {
      this.message = '❌ Failed to delete class.';
      this.isSuccess = false;
    }
  });

  this.confirmDeleteModal = false;
  this.selectedClass = null;

  setTimeout(() => (this.message = ''), 3000);
}
}
