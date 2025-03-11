import { ChangeDetectionStrategy, Component, DoCheck, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoaderComponent } from './Components/utilities/loader/loader.component';
import { NgIf } from '@angular/common';
import { SidebarComponent } from "./Components/utilities/sidebar/sidebar.component";
import { ToggleService } from './_services/toggle.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { AiIconComponent } from './Components/utilities/ai-icon/ai-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoaderComponent, NgIf, SidebarComponent , AiIconComponent],
  templateUrl: './app.component.html',
  animations:[
    trigger('popup',[
      transition(':enter',[
        style({opacity:'0'}),
        animate('250ms')
      ]),
      transition(':leave',[
        animate('150ms',style({opacity:'0'}))])
    ]) 
  ]
  ,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements DoCheck{
  title = 'Blogs_APP';
  loader:boolean=false;
  header:boolean=true;
  footer:boolean=true;
  aiIcon:boolean=true;
  sidebar:boolean=false;
  router = inject(Router);
  toggleservice = inject(ToggleService);
  ngDoCheck(): void {
      if(this.router.url=="/home"||this.router.url=="/about"||this.router.url=="/contactus"||this.router.url=="/profile"||this.router.url=="/admin"
        ||this.router.url=="/blogs"||this.router.url=="/generateblogs"||this.router.url=="/blogdetails/:id"||this.router.url.includes("/blogdetails/")
        ||this.router.url=="/admin/manageblogs" || this.router.url=="/admin/manageusers")
      {
        this.header=true;
        this.footer=true; 
        this.aiIcon=true;
      }
      else
      {
          this.header=false;
          this.footer=false; 
          this.aiIcon=false;
      }
      this.toggleservice.toggle.subscribe(d=>this.sidebar=d);
      this.toggleservice.loader.subscribe(d=>this.loader=d);
  }
}
