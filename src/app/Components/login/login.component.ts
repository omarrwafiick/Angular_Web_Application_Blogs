import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_Services/Authentication.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../_Models/Login';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { TitleService } from '../../_Services/titles.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  titleService= inject(TitleService)
  pageTitle:string="Log in - Blurb";
  pageDescriptipn:string="";
  http = inject(AuthenticationService);
  builder = inject(FormBuilder);
  router = inject(Router);
  toaster = inject(ToastrService);
  hide = true;
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('encryptedPassword');
    if(email&&password){
      this.loginForm.controls.email.setValue(email); 
      let pass = CryptoJS.AES.decrypt(password,"kekrekrkerkerasahduwdewd2323");
      this.loginForm.controls.password.setValue(pass);
    }
  }
  loginForm=this.builder.group({
    email:['',Validators.required,Validators.email],
    password:['',Validators.required]
  })
  Login(){
    if(this.loginForm.valid){
      let user = new Login();
      let vals = this.loginForm.value;
      user.email=vals.email;
      user.password=vals.password;
      this.http.Login(user).subscribe({next:(response:any)=>{
        localStorage.setItem("id",response.UserId);
        localStorage.setItem("username",response.userName);
        localStorage.setItem("gender",response.gender);
        localStorage.setItem("email",response.email);
        localStorage.setItem("token",response.Token)
        this.router.navigate([""]);
      }})
    }
    else{
      alert("please enter data required");
    }
  }
  ForgetPass(){
    
  }
}
