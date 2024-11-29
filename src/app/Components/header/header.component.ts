import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from "../utilities/avatar/avatar.component";
import { AuthenticationService } from '../../_Services/Authentication.service';
import { ToggleService} from '../../_Services/toggle.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AvatarComponent,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  logo:string="/Assets/logo.webp";
  isUser:boolean=false;
  sidebarservice = inject(ToggleService);
  sidebar:boolean=false;
  service=inject(AuthenticationService);
  ngOnInit(): void {
    if(localStorage.getItem("id")){
      this.isUser=true;
    }
  }
  Logout(){
    this.service.LogoutUser();
  }
  OpenSideBar(){
    this.sidebarservice.toggle.next(!this.sidebar);
  }
}
