import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../_Services/Authentication.service';
import { ToggleService } from '../../../_Services/toggle.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isUser:boolean=false;
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
 