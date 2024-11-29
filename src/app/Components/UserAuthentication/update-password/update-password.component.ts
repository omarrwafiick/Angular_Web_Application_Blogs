import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_Services/Authentication.service';
import { ToastrService } from 'ngx-toastr';
import { TitleService } from '../../../_Services/titles.service';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit{
  titleService= inject(TitleService)
  pageTitle:string="Update Password - Blurb";
  pageDescriptipn:string="";
  http = inject(AuthenticationService);
  builder = inject(FormBuilder);
  router = inject(Router);
  toaster = inject(ToastrService);
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
  newPasswordForm=this.builder.group({
    newpassword:['',Validators.required],
    confirmpassword:['',Validators.required],
  })
  Submit(){
    if(this.newPasswordForm.valid){
      let email = this.http.GetEmail();
      let password = this.newPasswordForm.controls.newpassword.value;
      this.http.UpdatePassword(email,password).subscribe({
        next:()=>{
          this.router.navigate(["/login"]);
        }
      });
    }
  }
}
