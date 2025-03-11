import { NgIf, NgStyle } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../_services/Authentication.service';
import { PopUpStateSelector, store } from '../../../store/blurb.selector';
import { MainBlurb } from '../../../_models/MainBlurb';
import { Store } from '@ngrx/store';
import { ChangePopupStatus } from '../../../store/blurb.action';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  store=inject(Store<MainBlurb>);
  @Input()
  user:boolean=false;
  @Input()
  otheruser:boolean=false;
  service = inject(AuthenticationService);
  popupstate:boolean=true;
  ngOnInit(): void {
    this.store.select(PopUpStateSelector).subscribe(d=>this.popupstate=d);
    //select username
    /* if(this.user){
      let gen= this.service.GetGender();
      if(gen.toLowerCase()==="male"){
        this.avatar="/assets/male.png";
      }
      else{
        this.avatar="/assets/female.png";
      }
    }
    if(this.otheruser){
       this.avatar="/assets/male.png";
    } */
  }
  @Input()
  avatar:string="";
  @Input()
  profile:boolean=false;
  popup:boolean=false;
  username:string="omarrwafiick";
  Trigger(){
    this.popup=!this.popup;
  }
  Logout(){
    //dispatch logout
  }
  Close(){
    this.store.dispatch(ChangePopupStatus({bool:false}));
  }
}
