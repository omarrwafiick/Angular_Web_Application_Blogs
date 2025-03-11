import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [NgStyle,RouterLink],
  templateUrl: './notfound.component.html'
})
export class NotfoundComponent {
  img:string="/assets/error.png" 
}
