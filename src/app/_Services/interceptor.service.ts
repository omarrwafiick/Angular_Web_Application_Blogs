import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './Authentication.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private ReqSrv:AuthenticationService,private router:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.ReqSrv.GetUsername()){
      return next.handle(req);
    }
    const modifiedRequest = req.clone( { headers:req.headers.set('Authorization', 'Bearer '+this.ReqSrv.GetToken()) } );
    return next.handle(modifiedRequest).pipe(tap(
      succ=>{},
      err=>{
        if(err.status== 401){//not valid token
          /* this.ReqSrv.RemoveToken(); */
          this.router.navigateByUrl("/login");
        }
        if(err.status== 403){//unauthorized 
          this.router.navigateByUrl("/home");
        }
      }
    ));
  }
}
