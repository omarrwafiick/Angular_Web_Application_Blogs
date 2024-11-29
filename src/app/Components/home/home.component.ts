import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { BlogService } from '../../_Services/blog.service';
import { Blog } from '../../_Models/Blog';
import { CardComponent } from '../utilities/card/card.component'; 
import { HeroComponent } from '../hero/hero.component';
import { SearchResult } from '../../_Services/search_result.service';
import { AddblogComponent } from '../addblog/addblog.component';
import { MatDialog } from '@angular/material/dialog';
import { TitleService } from '../../_Services/titles.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent,HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,DoCheck{
  titleService= inject(TitleService)
  pageTitle:string="Home - Blurb";
  pageDescriptipn:string="";
  requests= inject(BlogService);
  searchService= inject(SearchResult);
  dialog = inject(MatDialog);
  featuredBlogs:Blog[]=[];
  result:string="";
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
    this.requests.GetfeaturedBlogs().subscribe(d=>this.featuredBlogs=d);
  }
  ngDoCheck(): void {
    this.searchService.blogName.subscribe(d=>this.result==d);
    if(this.result != ""){
        this.featuredBlogs.filter(d => d.title===this.result);
    }
  }
  OpenPopUp(){
    this.dialog.open(AddblogComponent,{
      width:'30%',
      enterAnimationDuration:'800ms',
      exitAnimationDuration:'800ms',
    })
  }
}
