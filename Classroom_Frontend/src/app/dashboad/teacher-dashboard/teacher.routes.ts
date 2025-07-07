import { Routes } from '@angular/router';
import { TeacherDashboardComponent } from './teacher-dashboard.component';
import { TeacherClassDetailComponent } from '../../classroom-details/teacher-class-detail/teacher-class-detail.component';
import { TeacherQuizDetailComponent } from '../../quiz/teacher-quiz-detail/teacher-quiz-detail.component';
import { TeacherSubmissionViewComponent } from '../../quiz/teacher-submission-view/teacher-submission-view.component';
import { AssignmentSubmissionListComponent } from '../../assignment-submission-list/assignment-submission-list.component';

export const TeacherRoutes: Routes = [
  { path: '', component: TeacherDashboardComponent },
  { path: 'details/:id', component: TeacherClassDetailComponent },
  { path: 'quiz/:quizId/:classId', component: TeacherQuizDetailComponent } ,
  { path: 'SubmissionView/:quizId/:classId', component:TeacherSubmissionViewComponent  },
  { path: 'SubmissionList/:assignmentId',component:AssignmentSubmissionListComponent} 
];
