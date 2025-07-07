import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassRoomService } from '../../services/classroom-Service/class-room.service';
import { QuizService } from '../../services/quiz-Service/quiz.service';

@Component({
  selector: 'app-quiz-submission-details',
  imports: [CommonModule],
  templateUrl: './quiz-submission-details.component.html',
  styleUrl: './quiz-submission-details.component.scss'
})
export class QuizSubmissionDetailsComponent {
  class: any;
  questions: any;
  answers: { [key: string]: string } = {};
  score: any;


  constructor(private route: ActivatedRoute,
    private classroomService: ClassRoomService,
    private quizService: QuizService) { }

  ngOnInit() {
    const studentId = localStorage.getItem('userId')!;
    const quizId = this.route.snapshot.paramMap.get('quizId')!;
   
    this.quizService.getQuizsubmissionbyStudentIdAndQuizId(studentId, quizId).subscribe((data) => {
      this.score = data[0].score;
      this.answers = data[0].answersJson ? JSON.parse(data[0].answersJson) : {};
 
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

  getCorrectOptionText(question: any): string {
    return question[question.correctAnswer];
  }

  getAnswerText(question: any, selectedOption: string): string | null {
    if (!selectedOption) return null;
    return question[selectedOption];
  }

  getOptions(question: any) {
    const options = [];

    if (question.optionA) {
      options.push({ label: 'A', key: 'optionA', value: question.optionA });
    }
    if (question.optionB) {
      options.push({ label: 'B', key: 'optionB', value: question.optionB });
    }
    if (question.questionType === 'MCQ') {
      if (question.optionC) {
        options.push({ label: 'C', key: 'optionC', value: question.optionC });
      }
      if (question.optionD) {
        options.push({ label: 'D', key: 'optionD', value: question.optionD });
      }
    }

    return options;
  }




}
