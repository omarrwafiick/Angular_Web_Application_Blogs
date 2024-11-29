import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Blog } from '../../../_Models/Blog';
import { BlogService } from '../../../_Services/blog.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Category } from '../../../_Models/Category';
import { RouterLink } from '@angular/router';
import { TitleService } from '../../../_Services/titles.service';

@Component({
  selector: 'app-manage-blogs', 
  standalone: true,
  imports: [MatPaginator,MatSort,MatTableModule,MatFormFieldModule,MatInputModule,MatButtonModule,RouterLink],
  templateUrl: './manage-blogs.component.html',
  styleUrl: './manage-blogs.component.css'
})
export class ManageBlogsComponent implements AfterViewInit,OnInit{
  titleService= inject(TitleService)
  pageTitle:string="Manage Blogs - Blurb";
  pageDescriptipn:string="";
  displayedColumns: string[] = ['Title', 'CategoryId','Action'];
  dataSource: MatTableDataSource<Blog>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Blogs:Blog[]=[];
  Categories:Category[]=[];
  service = inject(BlogService);
  constructor() { 
    this.dataSource = new MatTableDataSource(this.Blogs);
  }
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
    this.service.GetAllBlogs().subscribe(d=>this.Blogs=d);
    this.dataSource.data = this.Blogs;
    this.service.GetAllCategories().subscribe(d=>this.Categories=d);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  Delete(row:Blog){
    this.service.DeleteBlog(row.id).subscribe({next:()=>{
      this.dataSource.data = this.Blogs.filter(b=>b.id!==row.id);
    }});
  }
}

