import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JobAppealService } from 'src/app/services/common/models/job-appeal.service';
import { timeout } from 'rxjs';

export const jobAppealGuard: CanActivateFn = async (route, state) => {

  debugger
  const router = inject(Router);
  const jobAppealService = inject(JobAppealService); // Assuming you have a service for job appeals

   
   var data: any = await jobAppealService.GetCurrentUserJobAppeal();
  

  if (data.currentUserJobAppeal.appealState) {
    router.navigate(['/profile']);
    return false;
  }

  return true;
};
