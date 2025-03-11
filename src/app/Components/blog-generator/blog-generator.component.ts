import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../_services/blog.service';
import { Category } from '../../_models/Category';
import { GenerateBlogService } from '../../_services/AI.service';
import { AIBlog, Blog } from '../../_models/Blog';
import { NgStyle } from '@angular/common';
import { TitleService } from '../../_services/titles.service';
import { deactOnManyComponents } from '../../_services/auth.guard';
import { CanExitClass } from '../../_services/can_exit.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-generator',
  standalone: true,
  imports: [NgStyle,ReactiveFormsModule],
  templateUrl: './blog-generator.component.html',
})
export class BlogGeneratorComponent implements OnInit , deactOnManyComponents{
  titleService= inject(TitleService)
  pageTitle:string="Blog Generator - Blurb";
  pageDescriptipn:string="";
  Airequest=inject(GenerateBlogService);  
  blogrequest=inject(BlogService);  
  builder= inject(FormBuilder);
  categories:Category[]=[]; 
  blog:AIBlog=null;
  newBlog:Blog=null;
  BlogAiForm=this.builder.group({
    category:['',Validators.required]
  }); 
  ngOnInit(): void {
    this.CanExitComponent();
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
    this. blogrequest.GetAllCategories().subscribe(d=>d = this.categories);
  }

  CanExit = inject(CanExitClass);
  CanExitComponent(){
    this.CanExit.formForConfirm=this.BlogAiForm;
    return this.CanExit.CanExit();
  }
  AiGenerate(cat:string){
    this.Airequest.GenerateBlogByAi(cat).subscribe(d=>this.blog=d);
  }
  GenerateNewBlog(){
    //fill blog data
    this.blogrequest.CreateBlog(this.newBlog).subscribe()
  }
}
