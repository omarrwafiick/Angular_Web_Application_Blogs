import { Component, inject, OnInit } from '@angular/core';
import { TitleService } from '../../_services/titles.service';
import { NgStyle } from '@angular/common';
import { AboutPersonelComponent } from '../utilities/about-personel/about-personel.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgStyle,AboutPersonelComponent],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit{
  titleService= inject(TitleService)
  pageTitle:string="About Us - Blurb";
  cover:string="assets/team.jpg";
  pageDescriptipn:string="";
  ngOnInit(): void {
    this.titleService.TitleAndDesc(this.pageTitle,this.pageDescriptipn);
  }
}
