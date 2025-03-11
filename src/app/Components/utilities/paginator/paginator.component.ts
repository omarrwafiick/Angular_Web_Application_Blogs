import { Component, inject } from '@angular/core';
import { BlogService } from '../../../_services/blog.service';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent{
  requests = inject(BlogService);
  blogPage:number=1;
  Add(){
    //use loader
    this.blogPage++;
    //use paginator throw store
  }
  Back(){
    if(this.blogPage>1){
      this.blogPage--;
    //use paginator throw store
    }
  }
}
