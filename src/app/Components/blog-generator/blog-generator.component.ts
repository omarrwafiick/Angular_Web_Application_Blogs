import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../_Services/blog.service';
import { Category } from '../../_Models/Category';
import { GenerateBlogService } from '../../_Services/AI.service';
import { AIBlog, Blog } from '../../_Models/Blog';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TitleService } from '../../_Services/titles.service';

@Component({
  selector: 'app-blog-generator',
  standalone: true,
  imports: [NgIf],
  templateUrl: './blog-generator.component.html',
  styleUrl: './blog-generator.component.css'
})
export class BlogGeneratorComponent implements OnInit{
  titleService= inject(TitleService)
  pageTitle:string="Blog Generator - Blurb";
  pageDescriptipn:string="";
  Airequest=inject(GenerateBlogService);  
  blogrequest=inject(BlogService);  
  toaster = inject(ToastrService);
  categories:Category[]=[];
  blog:AIBlog=null;
  newBlog:Blog=null;
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
    this. blogrequest.GetAllCategories().subscribe(d=>d = this.categories);
  }
  AiGenerate(cat:string){
    this.Airequest.GenerateBlogByAi(cat).subscribe(d=>this.blog=d);
  }
  GenerateNewBlog(){
    //fill blog data
    this.blogrequest.CreateBlog(this.newBlog).subscribe()
  }
}
