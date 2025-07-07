import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClassRoomService } from '../../services/classroom-Service/class-room.service';
import { ClassroomEnrollmentService } from '../../services/ClassroomEnrollment-Service/classroom-enrollment.service';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz-Service/quiz.service';
import { AnnoucementService } from '../../services/annoucement-Service/annoucement.service';
import { AssignmentService } from '../../services/assignment-service/assignment.service';
import { StreamService } from '../../services/steam-Service/stream.service';
import { CommentSectionComponent } from "../../comment-section/comment-section.component";
import { CommentService } from '../../services/comment-Service/comment.service';

@Component({
  selector: 'app-teacher-class-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CommentSectionComponent],
  templateUrl: './teacher-class-detail.component.html',
  styleUrl: './teacher-class-detail.component.scss'
})
export class TeacherClassDetailComponent {
  classroom: any;
  class: any;
  students: any[] = [];
  selectedTab = 'stream';
  streamData: any[] = [];

  announcements: any[] = [];
  quizzes: any[] = [];
  assignments: any[] = [];

  showModal = false;
  modalType = '';
  modalTitle = '';
  modalData: any = {};
  isEditing = false;
  editItemId: string | null = null;

  userId=localStorage.getItem('userId')!;
  username=localStorage.getItem('fullName')!;

  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassRoomService,
    private classroomEnrollmentService: ClassroomEnrollmentService,
    private quizService: QuizService,
    private annoucementService: AnnoucementService,
    private assignmentService: AssignmentService,
    private streamService: StreamService,
    private commentService:CommentService
  ) {}

  ngOnInit() {
    const classId = this.route.snapshot.paramMap.get('id')!;

    this.classroomService.getClassroomById(classId).subscribe((data) => {
      this.class = data;

      this.classroomEnrollmentService.getEnrolledStudents(classId).subscribe((studentsData) => {
        this.students = studentsData;

        this.classroom = {
          className: this.class.className,
          description: this.class.description,
          accessCode: this.class.accessCode,
          createdAt: this.class.createdAt,
          teacherName: localStorage.getItem('fullName')!,
          students: this.students.map(student => ({
            fullName: student.fullName,
          }))
        };
      });
    });

    this.commentService.RefresshOn().subscribe(()=>{
       this.loadStreamData();
    })

    this.loadQuizzes();
    this.loadAnnouncements();
    this.loadAssignments();
    this.loadStreamData();
  }

  loadQuizzes() {
    const classId = this.route.snapshot.paramMap.get('id')!;
    this.quizService.getQuizzesByClassroomId(classId).subscribe((quizData) => {
      this.quizzes = quizData;
    });
  }

  loadAnnouncements() {
    const classId = this.route.snapshot.paramMap.get('id')!;
    this.annoucementService.getAnnouncementsByClassroomId(classId).subscribe((announcementData) => {
      this.announcements = announcementData;
    });
  }

  loadAssignments() {
    const classId = this.route.snapshot.paramMap.get('id')!;
    this.assignmentService.getAssignmentsByClassroomId(classId).subscribe((assignmentData) => {
      this.assignments = assignmentData;
    });
  }

  loadStreamData() {
    const classId = this.route.snapshot.paramMap.get('id')!;
    this.streamService.getStreamDetails(classId).subscribe((streamData) => {
      this.streamData = streamData;
    });
  }

  getRandomColor(name: string): string {
    const colors = ['#4285f4', '#34a853', '#fbbc05', '#ea4335', '#9c27b0', '#00acc1', '#ff7043'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  openAnnouncementModal(announcement?: any) {
    this.modalType = 'announcement';
    this.modalTitle = announcement ? 'Edit Announcement' : 'Create Announcement';
    this.modalData = announcement ? { ...announcement } : {};
    this.isEditing = !!announcement;
    this.editItemId = announcement?.id || null;
    this.showModal = true;
  }

  openAssignmentModal(assignment?: any) {
    this.modalType = 'assignment';
    this.modalTitle = assignment ? 'Edit Assignment' : 'Create Assignment';
    this.modalData = assignment ? { ...assignment } : {};
    this.isEditing = !!assignment;
    this.editItemId = assignment?.id || null;
    this.showModal = true;
  }

  openQuizModal(quiz?: any) {
    this.modalType = 'quiz';
    this.modalTitle = quiz ? 'Edit Quiz' : 'Create Quiz';
    this.modalData = quiz ? { ...quiz } : {};
    this.isEditing = !!quiz;
    this.editItemId = quiz?.id || null;
    this.showModal = true;
  }

  submitModalForm() {
    const classId = this.route.snapshot.paramMap.get('id')!;

    if (this.modalType === 'assignment') {
      const assignmentDto = {
        classroomId: classId,
        title: this.modalData.title,
        description: this.modalData.description,
        dueDate: this.modalData.deadline
      };

      if (this.isEditing && this.editItemId) {
        this.assignmentService.updateAssignment(this.editItemId, assignmentDto).subscribe(() => this.refreshAndClose());
      } else {
        this.assignmentService.createAssignment(assignmentDto).subscribe(() => this.refreshAndClose());
      }

    } else if (this.modalType === 'announcement') {
      const announcementDto = {
        classroomId: classId,
        title: this.modalData.title,
        description: this.modalData.description
      };

      if (this.isEditing && this.editItemId) {
        this.annoucementService.updateAnnouncement(this.editItemId, announcementDto).subscribe(() => this.refreshAndClose());
      } else {
        this.annoucementService.createAnnouncement(announcementDto).subscribe(() => this.refreshAndClose());
      }

    } else if (this.modalType === 'quiz') {
      const quizDto = {
        classroomId: classId,
        title: this.modalData.title,
        deadline: this.modalData.deadline
      };

      if (this.isEditing && this.editItemId) {
        this.quizService.updateQuiz(this.editItemId, quizDto).subscribe(() => this.refreshAndClose());
      } else {
        this.quizService.createQuiz(quizDto).subscribe(() => this.refreshAndClose());
      }
    }
  }

  refreshAndClose() {
    this.loadQuizzes();
    this.loadAnnouncements();
    this.loadAssignments();
    this.loadStreamData();
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.modalData = {};
    this.isEditing = false;
    this.editItemId = null;
  }

 deleteQuiz(id: string) {
  if (confirm('Are you sure you want to delete this quiz?')) {
    this.quizService.deleteQuiz(id).subscribe(() => {
      // ✅ Immediately update UI
      this.quizzes = this.quizzes.filter(q => q.id !== id);
      this.loadStreamData(); // For stream tab refresh
    });
  }
}


deleteAnnouncement(id: string) {
  if (confirm('Are you sure you want to delete this announcement?')) {
    this.annoucementService.deleteAnnouncement(id).subscribe(() => {
      this.announcements = this.announcements.filter(a => a.id !== id);
      this.loadStreamData();
    });
  }
}

deleteAssignment(id: string) {
  if (confirm('Are you sure you want to delete this assignment?')) {
    this.assignmentService.deleteAssignment(id).subscribe(() => {
      this.assignments = this.assignments.filter(a => a.id !== id);
      this.loadStreamData();
    });
  }
}

}
