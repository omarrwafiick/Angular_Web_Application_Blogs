import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../_services/Authentication.service';
import { TitleService } from '../../../_services/titles.service';
import { deactOnManyComponents } from '../../../_services/auth.guard';
import { CanExitClass } from '../../../_services/can_exit.service';
import { FormsOperations } from '../../utilities/forms/formoperations';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,NgIf],
  templateUrl: './confirm-email.component.html'
})
export class ConfirmEmailComponent extends FormsOperations implements OnInit , deactOnManyComponents{
  titleService= inject(TitleService)
  pageTitle:string="Confirm Email - Blurb";
  logo:string="assets/icon.png";
  pageDescriptipn:string="";
  http = inject(AuthenticationService);
  builder = inject(FormBuilder);
  router = inject(Router);
  ngOnInit(): void {
    this.CanExitComponent();
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
  confEmailForm=this.builder.group({ 
    email:['',[Validators.required,Validators.email,Validators.maxLength(254),Validators.minLength(7)]],
  },{validators:this.passMatchValidator})
  CanExit = inject(CanExitClass);
  
  CanExitComponent(){
    this.CanExit.formForConfirm=this.confEmailForm;
    return this.CanExit.CanExit(); 
  }
  
  Submit(){
    if(this.confEmailForm.valid){
      let email = this.sanitizeInput(this.confEmailForm.controls.email.value);
      //dispatch action
    }
  }
  
DisplayError(control:string){
  return this.hasDisplayableError(this.confEmailForm,control);
}
}
 