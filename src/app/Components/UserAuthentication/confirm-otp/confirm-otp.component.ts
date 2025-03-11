import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/Authentication.service';
import { TitleService } from '../../../_services/titles.service';
import { CanExitClass } from '../../../_services/can_exit.service';
import { FormsOperations } from '../../utilities/forms/formoperations';
import { Store } from '@ngrx/store';
import { MainBlurb } from '../../../_models/MainBlurb';
import { ConfirmEmailAction } from '../../../store/blurb.action';
import { selectEmail } from '../../../store/blurb.selector';

@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [],
  templateUrl: './confirm-otp.component.html'
})
export class ConfirmOtpComponent extends FormsOperations implements OnInit {
  titleService= inject(TitleService)
  pageTitle:string="Otp Verification - Blurb";
  pageDescriptipn:string="";
  logo:string="assets/icon.png";
  @ViewChild("input_1")
  input_1:ElementRef;
  @ViewChild("input_2")
  input_2:ElementRef;
  @ViewChild("input_3")
  input_3:ElementRef;
  @ViewChild("input_4")
  input_4:ElementRef;

  http = inject(AuthenticationService);
  builder = inject(FormBuilder);
  router = inject(Router);
  store = inject(Store<MainBlurb>);
  ngOnInit(): void { 
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  } 
  CanExit = inject(CanExitClass);
  Submit(){
    if(this.input_1.nativeElement.value&&this.input_2.nativeElement.value&&this.input_3.nativeElement.value&&this.input_4.nativeElement.value){
      let otp = Number(this.sanitizeInput(this.input_1.nativeElement.value+this.input_2.nativeElement.value+this.input_3.nativeElement.value+this.input_4.nativeElement.value));
      if(this.http.ConfirmOtp(otp)){
        //dispatch open update password route
      }
    }
  }
  
  Resend(){
    let email;
    this.store.select(selectEmail).subscribe(d=>email=d);
    this.store.dispatch(ConfirmEmailAction({email:email}));
  }
  
} 
