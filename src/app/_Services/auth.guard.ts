import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './Authentication.service';
const service = inject(AuthenticationService);
const router = inject(Router)
export const authGuard: CanActivateFn = (route, state) => {
  if(service.GetToken()) return true;
  else {
    router.navigate([""]);
    return false;
  };
};
