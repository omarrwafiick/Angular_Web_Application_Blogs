import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { SearchComponent } from "../utilities/search/search.component";
import { MatDialog } from '@angular/material/dialog';
import { AddblogComponent } from '../addblog/addblog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgStyle, RouterLink],
  templateUrl: './hero.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  dialog = inject(MatDialog);
  img:string="assets/mobile.png"
  AddBlog() {
    this.dialog.open(AddblogComponent, {
      width: '60%',
      height: '80%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '200ms',
      panelClass: 'custom-dialog-styling'
    })
  }
}

