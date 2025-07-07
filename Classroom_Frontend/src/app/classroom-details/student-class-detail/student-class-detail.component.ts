import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClassRoomService } from '../../services/classroom-Service/class-room.service';
import { ClassroomEnrollmentService } from '../../services/ClassroomEnrollment-Service/classroom-enrollment.service';
import { QuizService } from '../../services/quiz-Service/quiz.service';
import { AnnoucementService } from '../../services/annoucement-Service/annoucement.service';
import { AssignmentService } from '../../services/assignment-service/assignment.service';
import { StreamService } from '../../services/steam-Service/stream.service';
import { FormsModule } from '@angular/forms';
import { CommentSectionComponent } from "../../comment-section/comment-section.component";
import { CommentService } from '../../services/comment-Service/comment.service';

@Component({
  selector: 'app-student-class-detail',
  imports: [CommonModule, FormsModule, RouterModule, CommentSectionComponent],
  templateUrl: './student-class-detail.component.html',
  styleUrl: './student-class-detail.component.scss'
})
export class StudentClassDetailComponent {
  classroom: any;
  class: any;
  students: any[] = [];
  selectedTab = 'stream';
  streamData: any[] = [];

  announcements: any[] = [];
  quizzes: any[] = [];
  assignments: any[] = [];
  submissions: any;

  showModal = false;
  modalType = '';
  modalTitle = '';
  modalData: any = {};

  selectedFiles: { [assignmentId: string]: File } = {};
  uploadedSubmissions: { [assignmentId: string]: boolean } = {};

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
  ) { }

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
    const studentId = localStorage.getItem('userId')!;
    this.quizService.getSubmissionsByStudent(studentId).subscribe((submission) => {
      this.submissions = submission;
    });

    this.commentService.RefresshOn().subscribe(()=>{
       this.loadStreamData();
    })

    // Dummy data
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
      this.checkUploadedSubmissions();
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

  // 🔻 Modal Controls
  openAnnouncementModal() {
    this.modalType = 'announcement';
    this.modalTitle = 'Create Announcement';
    this.modalData = {};
    this.showModal = true;
  }

  openAssignmentModal() {
    this.modalType = 'assignment';
    this.modalTitle = 'Create Assignment';
    this.modalData = {};
    this.showModal = true;
  }

  openQuizModal() {
    this.modalType = 'quiz';
    this.modalTitle = 'Create Quiz';
    this.modalData = {};
    this.showModal = true;
  }

  submitModalForm() {


    if (this.modalType === 'assignment') {
      const classId = this.route.snapshot.paramMap.get('id')!;
      const assignmentDto = {
        classroomId: classId,
        title: this.modalData.title,
        description: this.modalData.description,
        dueDate: this.modalData.deadline
      };
      this.assignmentService.createAssignment(assignmentDto).subscribe(() => {
        this.loadAssignments();
        this.loadStreamData();
        this.closeModal();
      });

    }
    else if (this.modalType === 'announcement') {
      const classId = this.route.snapshot.paramMap.get('id')!;
      const announcementDto = {
        classroomId: classId,
        title: this.modalData.title,
        description: this.modalData.description
      };
      this.annoucementService.createAnnouncement(announcementDto).subscribe(() => {
        this.loadAnnouncements();
        this.loadStreamData();
        this.closeModal();
      });
    }
    else if (this.modalType === 'quiz') {

      const classId = this.route.snapshot.paramMap.get('id')!;
      const quizPayload = {
        classroomId: classId,
        title: this.modalData.title,
        deadline: this.modalData.deadline
      };

      this.quizService.createQuiz(quizPayload).subscribe((createdQuiz) => {
        this.loadQuizzes();
        this.loadStreamData();
        this.closeModal();
      });
    }

    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
  }

  hasAttemptedQuiz(quizId: string): boolean {
    return Array.isArray(this.submissions) && this.submissions.some((sub: any) => sub.quizId === quizId);
  }

  onFileSelected(event: Event, assignmentId: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles[assignmentId] = input.files[0];
    }
  }

  uploadAssignment(assignmentId: string): void {
    const file = this.selectedFiles[assignmentId];
    const studentId = localStorage.getItem('userId'); // Ensure studentId is stored

    if (!file || !studentId) {
      alert('Missing file or student ID');
      return;
    }

    const metadata = {
      studentId: studentId,
      assignmentId: assignmentId
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadataJson', JSON.stringify(metadata));

    this.assignmentService.uploadAssignmentPdf(formData).subscribe({
      next: () => {
        delete this.selectedFiles[assignmentId];
        this.loadAssignments();
      },
      error: (err) => {
        alert('Failed to upload assignment.');
        console.error(err);
      }
    });
  }

  viewSubmissionPdf(assignmentId: string) {
    const studentId = localStorage.getItem('userId');
    if (!studentId) {
      alert('Student ID not found');
      return;
    }

    this.assignmentService.getSubmissionFileByAssignmentAndStudent(assignmentId, studentId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: (err) => {
        alert('Could not load the PDF file.');
        console.error(err);
      }
    });
  }

  checkUploadedSubmissions() {
    const studentId = localStorage.getItem('userId');
    if (!studentId) return;

    this.assignments.forEach(a => {
      this.assignmentService.getSubmissionFileByAssignmentAndStudent(a.id, studentId)
        .subscribe({
          next: (response: Blob) => {
            const isPdf = response.type === 'application/pdf';
            const isNotEmpty = response.size > 0;
            this.uploadedSubmissions[a.id] = isPdf && isNotEmpty;
          },
          error: () => {
            // No file found or error fetching
            this.uploadedSubmissions[a.id] = false;
          }
        });
    });
  }

  isBeforeDeadline(dueDate: string | Date): boolean {
    return new Date(dueDate) > new Date();
  }




}
