import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_Services/Authentication.service';
import { ToastrService } from 'ngx-toastr';
import { TitleService } from '../../../_Services/titles.service';
@Component({
  selector: 'app-change-username',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-username.component.html',
  styleUrl: './change-username.component.css'
})
export class ChangeUsernameComponent implements OnInit{
  titleService= inject(TitleService)
  pageTitle:string="Change Username - Blurb";
  pageDescriptipn:string="";
  http = inject(AuthenticationService);
  builder = inject(FormBuilder);
  router = inject(Router);
  toaster = inject(ToastrService);
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
  changeUsernameForm=this.builder.group({
    username:['',Validators.required],
  })
  Submit(){
    if(this.changeUsernameForm.valid){
      let email = this.http.GetEmail();
      let username = this.changeUsernameForm.controls.username.value;
      this.http.ChangeUsername(email,username).subscribe({
        next:()=>{
          this.router.navigate([""]);
        }
      });
    }
  }
}
