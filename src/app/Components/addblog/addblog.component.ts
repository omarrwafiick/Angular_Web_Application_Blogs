import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../_Services/blog.service';
import { Category } from '../../_Models/Category';

@Component({
  selector: 'app-addblog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addblog.component.html',
  styleUrl: './addblog.component.css'
})
export class AddblogComponent implements OnInit{
  request=inject(BlogService); 
  builder=inject(FormBuilder); 
  categories:Category[]=[];
  ngOnInit(): void {
      this.request.GetAllCategories().subscribe(d=>d = this.categories);
  }
  addBlogForm=this.builder.group({
      title:['',Validators.required,Validators.maxLength(30)],
      description:['',Validators.required,Validators.maxLength(150)],
      content:['',Validators.required,Validators.maxLength(400)],
      img:['',Validators.required],
      category:['',Validators.required]
  });
  AddBlog(){
    if(this.addBlogForm.valid){
      
    }
    else{
    }
  }
}
