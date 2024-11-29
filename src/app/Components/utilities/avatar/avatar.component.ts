import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../_Services/Authentication.service';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent implements OnInit {
  //condition based on gender in local storage
  @Input()
  user:boolean=false;
  @Input()
  otheruser:boolean=false;
  service = inject(AuthenticationService);
  ngOnInit(): void {
    if(this.user){
      let gen= this.service.GetGender();
      if(gen.toLowerCase()==="male"){
        this.avatar="/Assets/male.png";
      }
      else{
        this.avatar="/Assets/female.png";
      }
    }
    if(this.otheruser){
       this.avatar="/Assets/male.png";
    }
  }
  avatar:string="";
  @Input()
  profile:boolean=false;
  popup:boolean=false;
  Trigger(){
    this.popup=!this.popup;
  }
}
