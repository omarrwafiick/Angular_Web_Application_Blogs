import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './Authentication.service';
import { Observable} from 'rxjs';

export interface deactOnManyComponents{
  CanExitComponent:()=> boolean | Observable<boolean> | Promise<boolean>
}
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate ,CanDeactivate<deactOnManyComponents>{
  constructor(private req: AuthenticationService){};
  router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(this.req.GetUserId()){
          const claimreq = route.data['claimRequest'] as Function;
          if(claimreq){
              const claims =this.req.getClaims();
              if(!claimreq(claims)){
                this.router.navigateByUrl("/forbidden");
                return false;
              }
              return true;
          }
          return true;
      }
      this.router.navigateByUrl("/login")
      return false;
  }
  canDeactivate(component: deactOnManyComponents, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return component.CanExitComponent();
  }
}