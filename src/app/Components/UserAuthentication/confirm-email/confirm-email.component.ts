import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_Services/Authentication.service';
import { ToastrService } from 'ngx-toastr';
import { TitleService } from '../../../_Services/titles.service';
@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit {
  titleService= inject(TitleService)
  pageTitle:string="Confirm Email - Blurb";
  pageDescriptipn:string="";
  http = inject(AuthenticationService);
  builder = inject(FormBuilder);
  router = inject(Router);
  toaster = inject(ToastrService);
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
  confEmailForm=this.builder.group({
    email:['',Validators.required,Validators.email],
  })
  Submit(){
    if(this.confEmailForm.valid){
      let email = this.confEmailForm.controls.email.value;
      this.http.ConfirmEmail(email).subscribe({
        next:(resp:any)=>{
          this.http.UpdateOtp(resp.otp);
          this.router.navigate(["/otpconfirm"]);
        }
      });
    }
  }
}
 