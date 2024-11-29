import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Blog } from '../../../_Models/Blog';
import { Category } from '../../../_Models/Category';
import { BlogService } from '../../../_Services/blog.service';
import { AuthenticationService } from '../../../_Services/Authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgStyle } from '@angular/common';
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, NgStyle, AvatarComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  category:Category;
  requests = inject(BlogService);
  userrequests = inject(AuthenticationService);
  toaster = inject(ToastrService);
  isPost:boolean=false;
  @Input()
  blog:Blog;
  username:string="";
  email:string;
  userid:string;
  liked:boolean=false;
  shared:boolean=false;
  //choose one when use blog
  otherusername:string="";
  userpost:boolean=false;
  ngOnInit(): void {
    this.requests.GetCategoryById(this.blog.categoryId).subscribe(d=>this.category=d);
    if(this.isPost||this.userpost){

      this.userid = this.userrequests.GetUserId();
      this.email =  localStorage.getItem('email')
      
      this.requests.IsLikedByUser(this.blog.id,this.userid).subscribe({next:()=>{
        this.liked=true;
      }});

      this.requests.IsSharedByUser(this.blog.id,this.userid).subscribe({next:()=>{
          this.shared=true;
      }});

    }
    if(!this.userpost){
      this.userrequests.GetUserNameAsync(this.blog.userId).subscribe({
        next:d=>{
            this.otherusername=d;
        }
      })
    }
  }
  Like(blogid:number){
    if(!this.liked){
      this.requests.AddLike(blogid,this.userid).subscribe({next:()=>{
        //toaster
      }});
    }
    else{
      this.requests.RemoveLike(blogid,this.userid).subscribe({next:()=>{
        //toaster
      }});
    }
  }
  Share(blogid:number){
    if(!this.shared){
      this.requests.AddShare(blogid,this.userid).subscribe({next:()=>{
        //toaster
      }});
    }
    else{
      this.requests.RemoveShare(blogid,this.userid).subscribe({next:()=>{
        //toaster
      }});
    }
  }
}
