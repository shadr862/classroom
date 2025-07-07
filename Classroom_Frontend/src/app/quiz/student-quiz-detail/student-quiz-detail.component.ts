import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoomService } from '../../services/classroom-Service/class-room.service';
import { QuizService } from '../../services/quiz-Service/quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-quiz-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-quiz-detail.component.html',
  styleUrl: './student-quiz-detail.component.scss'
})
export class StudentQuizDetailComponent implements OnInit{
  class: any;
  questions: any;
  answers: { [key: string]: string } = {};
  deadline: any;
  deadlinePassed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private classroomService: ClassRoomService,
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('quizId')!;
    this.quizService.getQuizzByQuizId(quizId).subscribe((data) => {
      const now = new Date();
      const deadlineDate = new Date(data.deadline);
      this.deadlinePassed = now > deadlineDate;
    });
    this.loadQuizQuestions();
    this.loadClassroom();
  }

  loadQuizQuestions() {
    const quizId = this.route.snapshot.paramMap.get('quizId')!;
    this.quizService.getQuizQuestionById(quizId).subscribe((data) => {
      this.questions = data;
    });
  }

  loadClassroom() {
    const classId = this.route.snapshot.paramMap.get('classId')!;
    this.classroomService.getClassroomById(classId).subscribe((data) => {
      this.class = data;
    });
  }

  calculateScore(): number {
    let score = 0;

    for (let question of this.questions) {
      const key = question.quizId + '_' + question.id;
      const selected = this.answers[key];
      if (selected && selected === question.correctAnswer) {
        score++;
      }
    }

    return score;
  }

  submitQuiz() {
    if (this.deadlinePassed) return;

    const quizId = this.route.snapshot.paramMap.get('quizId')!;
    const studentId = localStorage.getItem('userId')!;
    const classId = this.route.snapshot.paramMap.get('classId')!;
    const submissionDto = {
      quizId: quizId,
      studentId: studentId,
      answersJson: JSON.stringify(this.answers),
      score: this.calculateScore()
    };

    this.quizService.createQuizSubmission(submissionDto).subscribe(() => {
      this.router.navigate(['dashboard/student/details', classId]);
    });
  }
}








