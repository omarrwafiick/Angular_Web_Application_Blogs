import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../_services/blog.service';
import { Blog } from '../../_models/Blog';
import { Category } from '../../_models/Category';
import { TitleService } from '../../_services/titles.service';
import { AuthenticationService } from '../../_services/Authentication.service';
import { User } from '../../_models/User';
import { CardComponent } from '../utilities/card/card.component';
import * as CryptoJS from 'crypto-js';

@Component({ 
  selector: 'app-blog-details',
  standalone: true,
  imports: [NgStyle,CardComponent],
  templateUrl: './blog-details.component.html'
})
export class BlogDetailsComponent implements OnInit {
  titleService= inject(TitleService)
  pageTitle:string="Blog Details - Blurb";
  pageDescriptipn:string="";
  activeroute =  inject(ActivatedRoute);
  requests = inject(BlogService);
  userService = inject(AuthenticationService);
  Blog:Blog;
  User:User;
  BlogUsername:string;
  Category:Category; 
  relatedBlogs:Blog[];
  private secretKey = '12fdfpl1pl323233rvdfsdqwqedw';
  ngOnInit(): void {
    //select related 3 blogs using selector
     this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
    let id = CryptoJS.AES.encrypt( this.activeroute.snapshot.params["id"], this.secretKey).toString();
    /*   this.requests.GetBlogById(id).subscribe(d=>this.Blog=d);
      this.requests.GetCategoryById(this.Blog.categoryId).subscribe(d=>this.Category=d); 
      this.requests.GetBlogsByCategoryId(this.Blog.categoryId).subscribe(d=>this.relatedBlogs=d);
      this.userService.GetUserById(this.Blog.userId).subscribe(d=>this.BlogUsername=d.username);
       this.userService.GetUserById(this.Blog.userId).subscribe(d=>this.User=d);  */
  }
}
