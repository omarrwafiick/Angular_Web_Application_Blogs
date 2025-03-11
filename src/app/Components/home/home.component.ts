import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { BlogService } from '../../_services/blog.service';
import { Blog } from '../../_models/Blog';
import { CardComponent } from '../utilities/card/card.component'; 
import { HeroComponent } from '../hero/hero.component';
import { SearchResult } from '../../_services/search_result.service';
import { TitleService } from '../../_services/titles.service';
import { CategoriesSectionComponent } from "../categories-section/categories-section.component";
import { FeaturedBlogsComponent } from "../featured-blogs/featured-blogs.component";
import { GetNotifiedComponent } from "../get-notified/get-notified.component";
import { PartnersComponent } from "../partners/partners.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, HeroComponent, CategoriesSectionComponent, FeaturedBlogsComponent, GetNotifiedComponent, PartnersComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit,DoCheck{
  titleService= inject(TitleService)
  pageTitle:string="Home - Blurb";
  pageDescriptipn:string="";
  requests= inject(BlogService);
  searchService= inject(SearchResult);
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
}
