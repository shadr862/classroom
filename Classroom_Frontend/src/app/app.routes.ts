import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboad/dashboard/dashboard.component';
import { teacherCanactivateGuard } from './guards/teacher-canactivate.guard';
import { studentCanactiveGuard } from './guards/student-canactive.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'teacher',
        loadChildren: () =>
          import('./dashboad/teacher-dashboard/teacher.routes').then(
            (m) => m.TeacherRoutes
          ),
          canActivate:[teacherCanactivateGuard]
      },
      {
        path: 'student',
        loadChildren: () =>
          import('./dashboad/student-dashboard/student.routes').then(
            (m) => m.StudentRoutes
          ),
          canActivate:[studentCanactiveGuard]
      },
      
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**',redirectTo: 'login',pathMatch: 'full'}
];
