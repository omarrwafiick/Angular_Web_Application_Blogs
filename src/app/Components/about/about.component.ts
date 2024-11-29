import { Component, inject, OnInit } from '@angular/core';
import { TitleService } from '../../_Services/titles.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  titleService= inject(TitleService)
  pageTitle:string="About Us - Blurb";
  pageDescriptipn:string="";
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
}
