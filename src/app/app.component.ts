import { Component, DoCheck, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoaderComponent } from './Components/utilities/loader/loader.component';
import { NgIf } from '@angular/common';
import { SidebarComponent } from "./Components/utilities/sidebar/sidebar.component";
import { ToggleService } from './_Services/toggle.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoaderComponent, NgIf, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations:[
    trigger('openClose',[
      transition(':enter',[
        style({transform:'translateX(100%)'}),
        animate('1s')
      ]),
      transition(':leave',[
        animate('1s',style({transform:'translateX(100%)'}))])
    ])
  ]
})
export class AppComponent implements DoCheck{
  title = 'Blogs_APP';
  loader:boolean=false;
  header:boolean=true;
  footer:boolean=true;
  sidebar:boolean=false;
  router = inject(Router);
  toggleservice = inject(ToggleService);
  ngDoCheck(): void {
    if(this.router.url=="/login"||this.router.url=="/signup"||this.router.url=="emailconfirm"
      ||this.router.url=="otpconfirm"||this.router.url=="changeusername"||this.router.url=="updatepassword")
      {
          this.header=false;
          this.footer=false; 
      }
      else{
          this.header=true;
          this.footer=true; 
      }
      this.toggleservice.toggle.subscribe(d=>this.sidebar=d);
      this.toggleservice.loader.subscribe(d=>this.loader=d);
  }
}
