import { ChangeDetectionStrategy, Component, DoCheck, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLink ,Router } from '@angular/router';
import { AvatarComponent } from "../utilities/avatar/avatar.component";
import { AuthenticationService } from '../../_services/Authentication.service';
import { ToggleService} from '../../_services/toggle.service';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AvatarComponent,NgIf,NgStyle],
  templateUrl: './header.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
}) 
export class HeaderComponent implements OnInit {
  logo:string="/assets/logo.png";
  isUser:boolean=false;
  sidebarservice = inject(ToggleService);
  renderer = inject(Renderer2);
  router = inject(Router);
  sidebar:boolean=false;
  service=inject(AuthenticationService);
  ngOnInit(): void {
    if(localStorage.getItem("id")){
      this.isUser=true;
    }
  }
  OpenSideBar(){
    this.sidebarservice.toggle.next(!this.sidebar);
  }
  previousele:HTMLElement=null;
  ChangeColor(element:HTMLElement){
    if(this.previousele==null) this.previousele=element;
    if(element.id!=this.previousele.id){
      this.renderer.addClass(element,'hyphens-manual');
      this.renderer.removeClass(this.previousele,'hyphens-manual');
      this.previousele=element;
    }
    else{
      this.renderer.addClass(element,'hyphens-manual');
    }
  }
}
