import { Component } from '@angular/core';
import { CategoryComponent } from '../utilities/category/category.component';

@Component({
  selector: 'app-categories-section',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './categories-section.component.html'
})
export class CategoriesSectionComponent {

}
