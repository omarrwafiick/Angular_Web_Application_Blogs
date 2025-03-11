import { ChangeDetectionStrategy, Component, inject, OnInit, Renderer2 } from '@angular/core';
import { AuthenticationService } from '../../_services/Authentication.service';
import { Blog } from '../../_models/Blog';
import { BlogService } from '../../_services/blog.service';
import { TitleService } from '../../_services/titles.service';
import { NgStyle } from '@angular/common';
import { CardComponent } from '../utilities/card/card.component';
import { RouterLink } from '@angular/router';
import { AddblogComponent } from '../addblog/addblog.component';
import { MatDialog } from '@angular/material/dialog';
import { StatsBarComponent } from "../utilities/stats-bar/stats-bar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgStyle, CardComponent, RouterLink, StatsBarComponent],
  templateUrl: './profile.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit{
  titleService= inject(TitleService)
  renderer = inject(Renderer2);
  service = inject(BlogService);
  userservice = inject(AuthenticationService);
  dialog = inject(MatDialog);
  pageTitle:string="Profile - Blurb";
  pageDescriptipn:string="";
  img:string="assets/male.png";
  backupBlogs:Blog[]=[];
  blogs:Blog[]=[];
  username:string="";
  fullname:string="";
  gender:string="";
  email:string="";
  likes:number=0;
  shares:number=0;
  
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
    this.gender=this.userservice.GetGender();
    this.username=this.userservice.GetUsername();
    this.fullname=this.userservice.GetFullname();
    this.email=this.userservice.GetEmail();
    this.service.GetUserBlogs().subscribe(
    {
      next:d=>{
        this.backupBlogs=d;
        this.likes=this.backupBlogs.filter(b=>b.liked).length;
        this.shares=this.backupBlogs.filter(b=>b.shared).length;
      } 
    }
    );
  }
  OnChoice(e:any){
    if(e.value=="likes"){
      this.blogs = this.backupBlogs.filter(b=>b.liked);
    }
    if(e.value=="shares"){
      this.blogs = this.backupBlogs.filter(b=>b.shared);
    }
    else{
      this.blogs=this.backupBlogs;
    }
  }
  OnSearch(e:any){
      this.blogs=this.backupBlogs.filter(b=>b.title==e.value);
  }
  AddBlog(){
    this.dialog.open(AddblogComponent,{
      width:'65%',
      height:'80%',
      maxWidth: 'none',
      enterAnimationDuration:'400ms',
      exitAnimationDuration:'300ms',
      panelClass: 'custom-dialog-styling'
    })
  }
  
  previousele:HTMLElement=null;
  ChangeColor(element:HTMLElement){
    if(this.previousele==null) this.previousele=element;
    if(element.id!=this.previousele.id){
      this.renderer.addClass(element,'font-medium');
      this.renderer.removeClass(this.previousele,'font-medium');
      this.previousele=element;
    }
    else{
      this.renderer.addClass(element,'font-medium');
    }
  }
}
