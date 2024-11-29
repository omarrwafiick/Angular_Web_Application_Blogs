import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_Services/Authentication.service';
import { Router, RouterLink } from '@angular/router';
import { SignUp } from '../../_Models/Signup';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { TitleService } from '../../_Services/titles.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  providers:[],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css' 
})
export class SignupComponent implements OnInit {
  titleService= inject(TitleService)
  pageTitle:string="Sign Up - Blurb";
  pageDescriptipn:string="";
  http = inject(AuthenticationService);
  builder = inject(FormBuilder);
  router = inject(Router);
  toaster = inject(ToastrService);
  @ViewChild('rememberme')
  checklist:ElementRef;
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
  signUpForm=this.builder.group({
    fullname:['',Validators.required],
    username:['',Validators.required],
    gender:['',Validators.required],
    phone:['',Validators.required],
    email:['',Validators.required,Validators.email],
    password:['',Validators.required],
    confirmpassword:['',Validators.required],
  });
  SignUp(){
    if(this.signUpForm.valid){
      let user = new SignUp();
      let vals = this.signUpForm.value;
      user.fullName=vals.fullname;
      user.userName=vals.username;
      user.email=vals.email;
      user.password=vals.password;
      user.gender=vals.gender;
      user.PhoneNumber=vals.phone; 
      this.http.SignUp(user).subscribe({next:(response:any)=>{
        localStorage.setItem("email",user.email);
        this.router.navigate(["/login"]);
        if(this.checklist.nativeElement.checked){
          var encryptedPassword = CryptoJS.AES.encrypt(user.password,"kekrekrkerkerasahduwdewd2323");
          localStorage.setItem("pass",encryptedPassword);
        }
      }});
    }
  else{
    alert("please enter data required");
  }
  }
}
