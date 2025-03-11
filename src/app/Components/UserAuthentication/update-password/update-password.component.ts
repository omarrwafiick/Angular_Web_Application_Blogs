import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/Authentication.service';
import { TitleService } from '../../../_services/titles.service';
import { deactOnManyComponents } from '../../../_services/auth.guard';
import { CanExitClass } from '../../../_services/can_exit.service';
import { FormsOperations } from '../../utilities/forms/formoperations';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,NgIf],
  templateUrl: './update-password.component.html'
})
export class UpdatePasswordComponent extends FormsOperations implements OnInit , deactOnManyComponents { 
  titleService = inject(TitleService)
  pageTitle:string="Update Password - Blurb";
  pageDescriptipn:string="";
  logo:string="assets/icon.png";
  http = inject(AuthenticationService);
  builder = inject(FormBuilder);
  router = inject(Router); 
  ngOnInit(): void {
    this.CanExitComponent();
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
  newPasswordForm=this.builder.group({
    password:['',Validators.required,Validators.maxLength(150),Validators.minLength(10)],
    confirmpassword:['',Validators.required],
  }
  ,{validators:this.passMatchValidator})
  CanExit = inject(CanExitClass);
  CanExitComponent(){
    this.CanExit.formForConfirm=this.newPasswordForm;
    return this.CanExit.CanExit();
  }
  Submit(){ 
    if(this.newPasswordForm.valid){
      let email = this.sanitizeInput(this.http.GetEmail());
      let password = this.sanitizeInput(this.newPasswordForm.controls.password.value);
      this.http.UpdatePassword(email,password).subscribe({
        next:()=>{
          this.router.navigate(["/login"]);
        }
      });
    }
  }
  DisplayError(control:string){
    return this.hasDisplayableError(this.newPasswordForm,control);
  }
}
