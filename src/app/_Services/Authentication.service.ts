import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Login } from '../_models/Login';
import { SignUp } from '../_models/Signup';
import { ContactData } from '../_models/ContactData';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/User';
import { Store } from '@ngrx/store';
import { MainBlurb } from '../_models/MainBlurb';
import { selectAppUser, selectEmail, selectNoftificationStatus, SelectOtp } from '../store/blurb.selector';
import { logOutAction } from '../store/blurb.action';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  http = inject(HttpClient);
  toaster= inject(ToastrService);
  store= inject(Store<MainBlurb>);
  baseUrl=environment.BaseUrl;
  private OtpSent:number;
  
  //getter methods 
  public GetToken(){
    let output;
    this.store.select(selectAppUser).subscribe(d=>output= d.AppData.token);
    return output;
  } 

  public GetGender(){
    let output;
    this.store.select(selectAppUser).subscribe(d=>output=d.AppData.gender);
    return output 
  }

  public GetEmail(){
    let output;
    this.store.select(selectAppUser).subscribe(d=>output=d.AppData.email);
    return output 
  }

  public GetUsername(){
    let output;
    this.store.select(selectAppUser).subscribe(d=>output=d.AppData.userName);
    return output 
  }

  public GetFullname(){
    let output;
    this.store.select(selectAppUser).subscribe(d=>output=d.AppData.fullName);
    return output
  }

  public GetUserId(){
    let output;
    this.store.select(selectAppUser).subscribe(d=>output=d.AppData.id);
    return output
  }

  public getClaims(){ 
    return JSON.parse(window.atob(this.GetToken()!.split('.')[1]));
  }
 
  //http requests
  
  public GetAllUsers(){
    return this.GetAllUsersAsync();
  }

  private GetAllUsersAsync(){
    return this.http.get<User[]>(this.baseUrl+"/auth/user/getallusers");
  }

  public GetUserById(id:string){
    return this.GetUserByIdAsyc(id);
  }

  private GetUserByIdAsyc(id:string){
    return this.http.get<User>(this.baseUrl+"/auth/user/getuserbyid?id="+id);
  }

  public DeleteUserById(id:string){
    return this.DeleteUserByIdAsync(id);
  }

  private DeleteUserByIdAsync(id:string){
    return this.http.delete(this.baseUrl+"/auth/user/deleteuser?id="+id);
  }
  
  public GetUserName(id:string){
    return this.GetUserNameAsync(id);
  }

  private GetUserNameAsync(id:string){
    return this.http.get<string>(this.baseUrl+"/auth/user/getusername?id="+id);
  }

  public Login(data:Login){
    return this.LoginAsync(data);
  }

  private LoginAsync(data:Login){
    return this.http.post<string>(this.baseUrl+"/auth/user/login",data);
  }

  public SignUp(data:SignUp){
    return this.SignUpAsync(data);
  } 

  private SignUpAsync(data:SignUp){
    return this.http.post(this.baseUrl+"/auth/user/register",data);
  }

  public ConfirmEmail(email:string){
    return this.ConfirmEmailAsync(email);
  }

  private ConfirmEmailAsync(email:string){
    return this.http.get(this.baseUrl+"/auth/user/confirmemail?email="+email);
  }

  private GetOtp(){
    let otp;
    this.store.select(SelectOtp).subscribe(d=>otp=d);
    return otp;
  }
  public ConfirmOtp(otp:number){
    return otp==this.GetOtp();
  }

  public UpdatePassword(email:string,password:string){
    return this.UpdatePasswordAsync(email,password);
  }

  private UpdatePasswordAsync(email:string,password:string){
    return this.http.post(this.baseUrl+"/auth/user/updatepassword?email="+email,password);
  }

  public ChangeUsername(email:string,newusername:string){
    return this.ChangeUsernameAsync(email,newusername);
  }

  private ChangeUsernameAsync(email:string,newusername:string){
    return this.http.post(this.baseUrl+"/auth/user/changeusername?email="+email,newusername);
  }

  public LogoutUser(){
    this.store.dispatch(logOutAction());
  }
 
  public Contact(data:ContactData){
    return this.ContactAsync(data);
  }

  private ContactAsync(data:ContactData){
    return this.http.post(this.baseUrl+"/auth/user/contactus",data);
  }
  
  public NotifiyUser(){
    let output;
    let email;
    this.store.select(selectNoftificationStatus).subscribe(d=>output=d);
    this.store.select(selectEmail).subscribe(d=>email=d);
    if(!output&&email){
      return this.NotifiyUserAsync(email);
    }
    this.ToasterFailed("Operation Faild","user is already notified");
    return null;
  }

  private NotifiyUserAsync(email:string){
      return this.http.post(this.baseUrl+"/auth/user/notifyuser",email);
  }

  public ToasterSuccess(message:string,result:string ){
    return this.toaster.success(message,result,{
      timeOut: 5000,
      positionClass: 'toast-top-center',
      closeButton: true,
      progressBar: true, 
    });
   } 
 
   public ToasterFailed(message:string,result:string ){
     return this.toaster.error(message,result, {
      timeOut: 5000,
      positionClass: 'toast-top-center',
      closeButton: true,
      progressBar: true, 
    });
    }
}