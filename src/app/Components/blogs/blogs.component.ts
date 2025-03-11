import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { BlogService } from '../../_services/blog.service';
import { Blog } from '../../_models/Blog';
import { CardComponent } from '../utilities/card/card.component';
import { TitleService } from '../../_services/titles.service';
import { SearchComponent } from "../utilities/search/search.component";
import { NgStyle } from '@angular/common';
import { PaginatorComponent } from "../utilities/paginator/paginator.component";
import { MatDialog } from '@angular/material/dialog';
import { AddblogComponent } from '../addblog/addblog.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CardComponent, SearchComponent, NgStyle, PaginatorComponent],
  templateUrl: './blogs.component.html'
})
export class BlogsComponent implements OnInit,DoCheck{
  titleService= inject(TitleService)
  pageTitle:string="Blogs - Blurb"; 
  pageDescriptipn:string="";
  requests = inject(BlogService);
  Blogs:Blog[];
  blogPage:number=1;
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn); 
  }
  ngDoCheck(): void {
    //use selector to get other blogs when paginate
  }
  dialog = inject(MatDialog);
    img:string="assets/cover.jpg"
    AddBlog() {
      this.dialog.open(AddblogComponent, {
        width: '60%',
        height: '80%',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '200ms',
        panelClass: 'custom-dialog-styling'
      })
    }
}

