import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassRoomService } from '../../services/classroom-Service/class-room.service';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz-Service/quiz.service';

@Component({
  selector: 'app-teacher-quiz-detail',
  imports: [CommonModule,FormsModule],
  templateUrl: './teacher-quiz-detail.component.html',
  styleUrl: './teacher-quiz-detail.component.scss'
})
export class TeacherQuizDetailComponent {
  class :any; 
  questions:any;
  showModal = false;

  newQuestion = {
    quizId: "",
    questionType: "",
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: ""
  };

  constructor(private route: ActivatedRoute,
    private classroomService: ClassRoomService,
    private quizService:QuizService) { }

  ngOnInit() {
    this.loadQuizQuestions();
    this.loadClassroom();
  }

  loadQuizQuestions()
  {
    const quizId = this.route.snapshot.paramMap.get('quizId')!;
    this.quizService.getQuizQuestionById(quizId).subscribe((data)=>{
      this.questions = data;
    });
  }

  loadClassroom() {
    const classId = this.route.snapshot.paramMap.get('classId')!; 
    this.classroomService.getClassroomById(classId).subscribe((data) => {
      this.class = data;
    });
  }

  getCorrectOptionText(question: any): string {
    return question[question.correctAnswer];
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  addQuestion() {
    const quizId = this.route.snapshot.paramMap.get('quizId')!;
    this.newQuestion.quizId = quizId;
    this.quizService.createQuizQuestion(this.newQuestion).subscribe(() => {
      this.closeModal();
      this.loadQuizQuestions();
    })
    
  }
  deleteQuestion(questionId: string) {
    this.quizService.deleteQuizQuestion(questionId).subscribe(() => {
      this.loadQuizQuestions();
    });
  }
  resetForm() {
    this.newQuestion = {
      quizId: "",
      questionType: "",
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: ""
    };
  }
}
