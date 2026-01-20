import {Component, Input} from '@angular/core';
import {User} from '../../model/User';
import {InitialsPipe} from '../../pipes/initials.pipe';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-user-card',
  imports: [
    InitialsPipe,
    NgClass
  ],
  templateUrl: './user-card.html'
})
export class UserCard {
  @Input() user: User | null = null;
}
