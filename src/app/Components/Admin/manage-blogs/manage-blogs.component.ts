import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Blog } from '../../../_models/Blog';
import { BlogService } from '../../../_services/blog.service';
import { Category } from '../../../_models/Category';
import { TitleService } from '../../../_services/titles.service';
import { MatDialog } from '@angular/material/dialog';
import { AddblogComponent } from '../../addblog/addblog.component';
import { NgStyle } from '@angular/common';
import { ConfirmationService } from '../../../_services/confirm.service';

@Component({
  selector: 'app-manage-blogs', 
  standalone: true,
  imports: [MatPaginator,MatSort,MatTableModule,MatFormFieldModule,MatInputModule],
  templateUrl: './manage-blogs.component.html',
})
export class ManageBlogsComponent implements AfterViewInit,OnInit{
  titleService= inject(TitleService);
  confirmationService = inject(ConfirmationService);
  service = inject(BlogService);
  dialog= inject(MatDialog)
  pageTitle:string="Manage Blogs - Blurb";
  pageDescriptipn:string="";
  displayedColumns: string[] = ['Title', 'CategoryId','Likes','Shares','Action'];
  dataSource: MatTableDataSource<Blog>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Blogs:Blog[]=[];
  Categories:Category[]=[];
  constructor() { 
    this.dataSource = new MatTableDataSource(this.Blogs);
  }
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
    this.IntialRequests();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  IntialRequests(){
    this.service.GetAllBlogs().subscribe(d=>this.Blogs=d);
    this.dataSource.data = this.Blogs;
    this.service.GetAllCategories().subscribe(d=>this.Categories=d);
  }

  FilterTbl(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetCategoryName(row:Blog){
    return this.Categories.find(c=>c.id===row.categoryId?c.name:null);
  }
  
  async Delete(row:Blog){ 
    const result = await this.confirmationService.confirm(
      'Are you Sure you want To Delete This Record?'
    );
    if(result){
      //dispatch delete action
      /* this.service.DeleteBlog(row.id).subscribe({next:()=>{
        this.dataSource.data = this.Blogs.filter(b=>b.id!==row.id); 
      }});*/
    }
  }

  ManageBlog(blog?:Blog){
    blog? blog.isFeatured = true : '';
    this.dialog.open(AddblogComponent,{
      width:'65%',
      height:'80%',
      maxWidth: 'none',
      enterAnimationDuration:'400ms',
      exitAnimationDuration:'300ms',
      panelClass: 'custom-dialog-styling',
      data:{ 
       blog,
      }
    }).afterClosed().subscribe(()=>{this.IntialRequests()})
  }

  AddBlog(){
    this.ManageBlog();
  }
}

