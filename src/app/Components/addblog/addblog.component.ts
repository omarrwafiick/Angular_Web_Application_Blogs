import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../_services/blog.service';
import { Category } from '../../_models/Category';
import { Blog, CreateBlogObj } from '../../_models/Blog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { deactOnManyComponents } from '../../_services/auth.guard';
import { CanExitClass } from '../../_services/can_exit.service';
import { FormsOperations } from '../utilities/forms/formoperations';
import { AuthenticationService } from '../../_services/Authentication.service';
import { NgClass, NgIf } from '@angular/common';
import { maxFileSizeValidator } from '../utilities/custome-validator/image-validator';

@Component({
  selector: 'app-addblog', 
  standalone: true, 
  imports: [ReactiveFormsModule,NgIf,NgClass],
  templateUrl: './addblog.component.html',
})
export class AddblogComponent extends FormsOperations implements OnInit , deactOnManyComponents{
  request=inject(BlogService); 
  user=inject(AuthenticationService); 
  builder=inject(FormBuilder);   
  constructor(@Inject(MAT_DIALOG_DATA) public data:Blog){
    super();
  }
  categories:Category[]=[];
  template:File=null;
  addBlogForm=this.builder.group({
      title:['',Validators.required,Validators.maxLength(30),Validators.minLength(3)],
      description:['',Validators.required,Validators.maxLength(150),Validators.minLength(10)],
      content:['',Validators.required,Validators.maxLength(400),Validators.minLength(10)],
      img:[this.template,Validators.required, maxFileSizeValidator(15)],
      category:['',Validators.required]
  });

  ngOnInit(): void {
    this.CanExitComponent();
      this.request.GetAllCategories().subscribe(d=>d = this.categories);
      if(this.data){
        let vals = this.addBlogForm;
        vals.controls['title'].setValue(this.data.title);
        vals.controls['description'].setValue(this.data.description);
        vals.controls['content'].setValue(this.data.content);
        vals.controls['img'].setValue(this.data.image);
        this.request.GetCategoryById(this.data.categoryId).subscribe(d=>vals.controls['category'].setValue(d.name));
      }
  }

  CanExit = inject(CanExitClass);
  CanExitComponent(){
    this.CanExit.formForConfirm=this.addBlogForm;
    return this.CanExit.CanExit();
  }

  AddBlog() {
    if (this.addBlogForm.valid) {
      if (this.addBlogForm.valid) {
        let blog = new CreateBlogObj();
        let vals = this.addBlogForm.value;
  
        blog.categoryId = Number(this.categories.filter(c => c.name == vals.category));
        blog.content = this.sanitizeInput(vals.content);
        blog.description = this.sanitizeInput(vals.description);
        blog.image = vals.img;  
        blog.isFeatured = false;
        blog.likes = 0;
        blog.shares = 0;
        blog.userId = this.user.GetUserId();
  
        this.request.CreateBlog(blog).subscribe({
          next: () => {
            // logic for successful submission
          },
          error: () => {
            // logic for error submission
          }
        });
      } else {
        // Handle form invalid case
      }
    }
  }
  

  DisplayError(control:string){
    return this.hasDisplayableError(this.addBlogForm,control);
  }
}
