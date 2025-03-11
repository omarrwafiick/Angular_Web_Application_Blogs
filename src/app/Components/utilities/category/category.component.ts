import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './category.component.html'
})
export class CategoryComponent {
  @Input()
  name:string="";
  @Input()
  img:string="";
  @Input()
  about:string="";
}
