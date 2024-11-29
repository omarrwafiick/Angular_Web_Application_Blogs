import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../_Services/blog.service';
import { Blog } from '../../_Models/Blog';
import { CardComponent } from '../utilities/card/card.component';
import { TitleService } from '../../_Services/titles.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit{
  titleService= inject(TitleService)
  pageTitle:string="Blogs - Blurb";
  pageDescriptipn:string="";
  requests = inject(BlogService);
  Blogs:Blog[];
  blogPage:number=1;
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
    this.requests.GetBlogs_Pagination(this.blogPage).subscribe(d=>this.Blogs=d);
  }
  Add(){
    //use loader
    this.blogPage++;
    this.requests.GetBlogs_Pagination(this.blogPage).subscribe(d=>this.Blogs=d);
  }
  Back(){
    
    this.blogPage--;
    this.requests.GetBlogs_Pagination(this.blogPage).subscribe(d=>this.Blogs=d);
  }
}
