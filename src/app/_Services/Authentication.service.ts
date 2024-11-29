import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Login } from '../_Models/Login';
import { SignUp } from '../_Models/Signup';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  http = inject(HttpClient);
  baseUrl=environment.BaseUrl;
  private OtpSent:number;
  
  public GetToken(){
    return localStorage.getItem('token');
  } 

  public GetGender(){
    return localStorage.getItem('gender');
  }

  public GetEmail(){
    return localStorage.getItem('email');
  }

  public GetUsername(){
    return localStorage.getItem('username');
  }

  public GetFullname(){
    return localStorage.getItem('fullname');
  }

  public GetUserId(){
    return localStorage.getItem('id');
  }

  
  public GetUserNameAsync(id:string){
    return this.http.get<string>(this.baseUrl+"/User/getusername?id="+id);
  }

  public Login(data:Login){
    //return token
    return this.LoginAsync(data);
  }
  private LoginAsync(data:Login){
    return this.http.post<string>(this.baseUrl+"/User/login",data);
  }

  public SignUp(data:SignUp){
    return this.SignUpAsync(data);
  } 

  private SignUpAsync(data:SignUp){
    return this.http.post(this.baseUrl+"/User/register",data);
  }

  public ConfirmEmail(email:string){
    return this.ConfirmEmailAsync(email);
  }

  private ConfirmEmailAsync(email:string){
    return this.http.get(this.baseUrl+"/User/confirmemail?email="+email);
  }

  public UpdateOtp(otp:number){
    this.OtpSent =otp;
  }

  public ConfirmOtp(otp:number){
    return otp==this.OtpSent;
  }

  public UpdatePassword(email:string,password:string){
    return this.UpdatePasswordAsync(email,password);
  }

  private UpdatePasswordAsync(email:string,password:string){
    return this.http.post(this.baseUrl+"/User/updatepassword?email="+email,password);
  }

  public ChangeUsername(email:string,newusername:string){
    return this.http.post(this.baseUrl+"/User/changeusername?email="+email,newusername);
  }
  public LogoutUser(){
    localStorage.clear();
  }
  
}