import { Component } from '@angular/core'; 
import { PaginatorComponent } from '../utilities/paginator/paginator.component';
import { NgStyle } from '@angular/common';
import { FeaturedBlogsCardComponent } from '../utilities/featured-blogs-card/featured-blogs-card.component';

@Component({
  selector: 'app-featured-blogs',
  standalone: true,
  imports: [FeaturedBlogsCardComponent,PaginatorComponent,NgStyle],
  templateUrl: './featured-blogs.component.html'
})
export class FeaturedBlogsComponent {

}
