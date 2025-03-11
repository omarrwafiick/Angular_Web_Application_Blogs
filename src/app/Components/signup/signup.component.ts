import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/Authentication.service';
import { Router, RouterLink } from '@angular/router';
import { SignUp } from '../../_models/Signup';
import { TitleService } from '../../_services/titles.service';
import { Subscription } from 'rxjs';
import { deactOnManyComponents } from '../../_services/auth.guard';
import { CanExitClass } from '../../_services/can_exit.service';
import { FormsOperations } from '../utilities/forms/formoperations';
import { NgClass, NgIf, NgStyle } from '@angular/common';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass,NgIf, NgStyle],
  providers:[],
  templateUrl: './signup.component.html'
})
export class SignupComponent extends FormsOperations implements OnInit ,OnDestroy , deactOnManyComponents{
  titleService= inject(TitleService)
  pageTitle:string="Sign Up - Blurb"; 
  pageDescriptipn:string="";
  logo:string="assets/icon.png";
  http = inject(AuthenticationService);
  builder = inject(FormBuilder);
  router = inject(Router);
  subscrption:Subscription;
  @ViewChild('rememberme')
  checklist:ElementRef;
  ngOnInit(): void {
    this.CanExitComponent();
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
  signUpForm=this.builder.group({
    fullname:['',[Validators.required,Validators.maxLength(32),Validators.minLength(12)]],
    username:['',[Validators.required,Validators.maxLength(30),Validators.minLength(6)]],
    gender:['',Validators.required],
    phone:['',[Validators.required,Validators.maxLength(15),Validators.minLength(8)]],
    email:['',[Validators.required,Validators.email,Validators.maxLength(254),Validators.minLength(7)]],
    password:['',Validators.required,Validators.maxLength(150),Validators.minLength(10)],
    confirmpassword:['',Validators.required],
  },{validators:this.passMatchValidator});
  CanExit = inject(CanExitClass);
  CanExitComponent(){ 
    this.CanExit.formForConfirm=this.signUpForm;
    return this.CanExit.CanExit();
  }
  SignUp(){
    if(this.signUpForm.valid){
      let user = new SignUp();
      let vals = this.signUpForm.value;
      user.fullName=this.sanitizeInput(vals.fullname);
      user.userName=this.sanitizeInput(vals.username);
      user.email=this.sanitizeInput(vals.email);
      user.password=this.sanitizeInput(vals.password);
      user.gender=this.sanitizeInput(vals.gender);
      user.PhoneNumber=this.sanitizeInput(vals.phone); 
      //dispacth action 
    }
  }
  DisplayError(control:string){
    return this.hasDisplayableError(this.signUpForm,control);
  }
  ngOnDestroy(): void {
  }

}
