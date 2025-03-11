import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-personel',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './about-personel.component.html',
  styleUrl: './about-personel.component.css'
})
export class AboutPersonelComponent {
@Input()
img:string;
@Input()
name:string;
@Input()
role:string;
}
