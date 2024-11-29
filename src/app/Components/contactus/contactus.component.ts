import { Component, inject, OnInit } from '@angular/core';
import { TitleService } from '../../_Services/titles.service';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent implements OnInit {
  titleService= inject(TitleService)
  pageTitle:string="Contact Us - Blurb";
  pageDescriptipn:string="";
  ngOnInit(): void {
      this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
}
