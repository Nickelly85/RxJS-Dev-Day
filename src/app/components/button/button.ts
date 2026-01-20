import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './button.html'
})
export class Button {
  @Input() class: string = '';
  @Input() route!: string;
}
