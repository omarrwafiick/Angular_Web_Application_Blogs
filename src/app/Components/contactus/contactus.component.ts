import { Component, inject, OnInit } from '@angular/core';
import { TitleService } from '../../_services/titles.service';
import { AuthenticationService } from '../../_services/Authentication.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactData } from '../../_models/ContactData';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { deactOnManyComponents } from '../../_services/auth.guard';
import { CanExitClass } from '../../_services/can_exit.service';
import { FormsOperations } from '../utilities/forms/formoperations';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [ReactiveFormsModule,NgStyle,NgIf,NgClass],
  templateUrl: './contactus.component.html'
})
export class ContactusComponent extends FormsOperations implements OnInit, deactOnManyComponents {
  titleService= inject(TitleService)
  request=inject(AuthenticationService); 
  builder=inject(FormBuilder);  
  pageTitle:string="Contact Us - Blurb"; 
  pageDescriptipn:string="";
  ngOnInit(): void { 
      this.CanExitComponent();     
      this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
  contactForm=this.builder.group({
    email:['',Validators.required,Validators.email,Validators.maxLength(254),Validators.minLength(7)],
    message:['',Validators.required,Validators.maxLength(350),Validators.minLength(10)],
  },{validators:this.passMatchValidator});
  CanExit = inject(CanExitClass);
  CanExitComponent(){
    this.CanExit.formForConfirm=this.contactForm;
    return this.CanExit.CanExit();
  }
  ContactSubmit(){
    if(this.contactForm.valid){
      let data = new ContactData();
      let vals = this.contactForm.value;
      data.email =this.sanitizeInput(vals.email);
      data.message=this.sanitizeInput(vals.message);
      //dispatch req
  }
}
  DisplayError(control:string){
    return this.hasDisplayableError(this.contactForm,control);
  }
}
