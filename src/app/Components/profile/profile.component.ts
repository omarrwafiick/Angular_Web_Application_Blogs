import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_Services/Authentication.service';
import { Blog } from '../../_Models/Blog';
import { BlogService } from '../../_Services/blog.service';
import { TitleService } from '../../_Services/titles.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  titleService= inject(TitleService)
  pageTitle:string="User Profile - Blurb";
  pageDescriptipn:string="";
  img:string="Assets/male.png";
  blogs:Blog[]=[];
  username:string="";
  fullname:string="";
  gender:string="";
  email:string="";
  service = inject(BlogService);
  userservice = inject(AuthenticationService);
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
    this.gender=this.userservice.GetGender();
    this.username=this.userservice.GetUsername();
    this.fullname=this.userservice.GetFullname();
    this.email=this.userservice.GetEmail();
    this.service.GetUserBlogs(this.email).subscribe(
    {
      next:d=>{
        this.blogs=d;
      } 
    }
    );
  }
}
