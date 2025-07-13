import { Component } from "@angular/core";
import { StudentDashboardComponent } from "../student-dashboard/student-dashboard.component";
import { Routes } from "@angular/router";
import { StudentClassDetailComponent } from "../../classroom-details/student-class-detail/student-class-detail.component";
import { StudentQuizDetailComponent } from "../../quiz/student-quiz-detail/student-quiz-detail.component";
import { QuizSubmissionDetailsComponent } from "../../quiz/quiz-submission-details/quiz-submission-details.component";

export const StudentRoutes:Routes = [
    {path:'',component:StudentDashboardComponent},
    {path:'details/:id',component:StudentClassDetailComponent},
    {path:'quiz/:quizId/:classId', component:StudentQuizDetailComponent  },
    {path: 'quizSubmission/:quizId/:classId/:studentId', component: QuizSubmissionDetailsComponent  } 
]