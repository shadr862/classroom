import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const teacherCanactivateGuard: CanActivateFn = (route, state) => {
  const role=localStorage.getItem('role');
  if(role=='teacher')
  {
     return true;
  }
  const router=inject(Router)
  return router.navigateByUrl('login');
};
