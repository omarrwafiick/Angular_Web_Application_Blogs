import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/Authentication.service';
import { TitleService } from '../../../_services/titles.service';
import { deactOnManyComponents } from '../../../_services/auth.guard';
import { CanExitClass } from '../../../_services/can_exit.service';
import { FormsOperations } from '../../utilities/forms/formoperations';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-change-username',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,NgIf],
  templateUrl: './change-username.component.html'
})
export class ChangeUsernameComponent extends FormsOperations implements OnInit , deactOnManyComponents{
  titleService= inject(TitleService)
  pageTitle:string="Change Username - Blurb";
  pageDescriptipn:string="";
  logo:string="assets/icon.png";
  http = inject(AuthenticationService);
  builder = inject(FormBuilder);
  router = inject(Router);
  ngOnInit(): void { 
    this.CanExitComponent();
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
  changeUsernameForm=this.builder.group({
    username:['',[Validators.required,Validators.maxLength(30),Validators.minLength(6)]],
  },{validators:this.passMatchValidator})
  CanExit = inject(CanExitClass);
  CanExitComponent(){
    this.CanExit.formForConfirm=this.changeUsernameForm;
    return this.CanExit.CanExit();
  }
  Submit(){
    if(this.changeUsernameForm.valid){
      let email = this.http.GetEmail();
      let username = this.sanitizeInput(this.changeUsernameForm.controls.username.value);
      //dispatch action
    }
  }
  DisplayError(control:string){
    return this.hasDisplayableError(this.changeUsernameForm,control);
  }
}
