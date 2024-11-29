import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { SearchResult } from '../../../_Services/search_result.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @ViewChild("data")
  data:ElementRef;
  service = inject(SearchResult);
  EditBlogs(){
    this.service.blogName.next(this.data.nativeElement.value);
  }
}
