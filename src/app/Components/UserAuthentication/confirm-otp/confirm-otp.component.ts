import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_Services/Authentication.service';
import { ToastrService } from 'ngx-toastr';
import { TitleService } from '../../../_Services/titles.service';
@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.css'
})
export class ConfirmOtpComponent implements OnInit{
  titleService= inject(TitleService)
  pageTitle:string="Confirm Otp - Blurb";
  pageDescriptipn:string="";
  http = inject(AuthenticationService);
  builder = inject(FormBuilder);
  router = inject(Router);
  toaster = inject(ToastrService);
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
  confOtpForm=this.builder.group({
    otp:['',Validators.required,Validators.email],
  })
  Submit(){
    if(this.confOtpForm.valid){
      let otp = Number(this.confOtpForm.controls.otp.value);
      if(this.http.ConfirmOtp(otp)){
        this.router.navigate(["/updatepassword"]);
      }
    }
  }
} 
