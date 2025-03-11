import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../_services/Authentication.service';
import { ToggleService } from '../../../_services/toggle.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  isUser:boolean=false;
  logo:string="/assets/logo.png";
  service=inject(AuthenticationService);
  toggleservice = inject(ToggleService);
  ngOnInit(): void {
    if(localStorage.getItem("id")){
      this.isUser=true;
    }
  }
  Logout(){
    this.service.LogoutUser();
  }
  Close(){
    this.toggleservice.toggle.next(false);
  }
}
 