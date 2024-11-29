import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../_Services/blog.service';
import { Blog } from '../../_Models/Blog';
import { Category } from '../../_Models/Category';
import { map } from 'rxjs';
import { LoaderComponent } from '../utilities/loader/loader.component'; 
import { TitleService } from '../../_Services/titles.service';

@Component({ 
  selector: 'app-blog-details',
  standalone: true,
  imports: [NgStyle,LoaderComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
  titleService= inject(TitleService)
  pageTitle:string="Blog Details - Blurb";
  pageDescriptipn:string="";
  activeroute =  inject(ActivatedRoute);
  requests = inject(BlogService);
  Blog:Blog;
  Category:Category;
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
      let id = this.activeroute.snapshot.params["id"];
      this.requests.GetBlogById(id).subscribe(d=>this.Blog=d);
      this.requests.GetCategoryById(this.Blog.categoryId).subscribe(d=>this.Category=d);
  }
}
