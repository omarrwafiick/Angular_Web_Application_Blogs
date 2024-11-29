import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from "../utilities/search/search.component";
import { CategoryComponent } from "../utilities/category/category.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgStyle, SearchComponent, CategoryComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  img:string="Assets/cover.jpg"
}
