import { Component, Input } from '@angular/core';
import { Blog } from '../../../_models/Blog';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-featured-blogs-card',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './featured-blogs-card.component.html',
  styleUrl: './featured-blogs-card.component.css'
})
export class FeaturedBlogsCardComponent {
  //map blog here
  @Input()
  blog:Blog;
  avatar:string="assets/male.png";
  img:string="assets/tech-category.png";
  title:string="why i started blurb ";
  about:string="  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ipsa ut pariatur praesentium maxime laudantium hic? Nihil alias in ab cumque doloribus provident consectetur rerum, fugit corporis officia? Cumque, quia!";
}
