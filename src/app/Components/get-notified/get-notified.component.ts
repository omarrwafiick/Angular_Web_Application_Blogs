import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-notified',
  standalone: true,
  imports: [NgStyle,ReactiveFormsModule],
  templateUrl: './get-notified.component.html',
  styleUrl: './get-notified.component.css'
})
export class GetNotifiedComponent {
  formbuilder= inject(FormBuilder);
  notifyForm=this.formbuilder.group({
    email:['', [Validators.required,Validators.email,Validators.maxLength(254),Validators.minLength(7)]]
  });
  Notify(){
    /* dispatch notification action here 
    let vals = this.contactForm.value;
    data.email =this.sanitizeInput(vals.email); */
  }
}
