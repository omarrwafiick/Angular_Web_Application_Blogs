import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../_services/Authentication.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../_models/Login';
import { Router, RouterLink } from '@angular/router';
import { TitleService } from '../../_services/titles.service';
import { deactOnManyComponents } from '../../_services/auth.guard';
import { CanExitClass } from '../../_services/can_exit.service';
import { FormsOperations } from '../utilities/forms/formoperations';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,NgClass,NgIf],
  templateUrl: './login.component.html'
})
export class LoginComponent extends FormsOperations implements OnInit , deactOnManyComponents{
  titleService= inject(TitleService)
  pageTitle:string="Log in - Blurb";
  pageDescriptipn:string="";
  logo:string="assets/icon.png";
  http = inject(AuthenticationService); 
  builder = inject(FormBuilder);
  router = inject(Router);
  hide = true;
  @ViewChild('rememberme')
  rememberme:ElementRef;
  ngOnInit(): void {
    this.CanExitComponent();
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }

  loginForm=this.builder.group({
    email:['',[Validators.required,Validators.email,Validators.maxLength(254),Validators.minLength(7)]],
    password:['',Validators.required,Validators.maxLength(150),Validators.minLength(10)]
  },{validators:this.passMatchValidator})

  CanExit = inject(CanExitClass);
  CanExitComponent(){
    this.CanExit.formForConfirm=this.loginForm;
    return this.CanExit.CanExit();
  }

  Login(){
    if(this.loginForm.valid){
      let user = new Login();
      let vals = this.loginForm.value;
      user.email=this.sanitizeInput(vals.email);
      user.password=this.sanitizeInput(vals.password);
      //dispatch action
    }
  }

  ForgetPass(){
    //open email confirm route by dispatch
  }

  DisplayError(control:string){
    return this.hasDisplayableError(this.loginForm,control);
  }
}
