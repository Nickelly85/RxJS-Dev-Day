import {Component, DestroyRef} from '@angular/core';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {UserCard} from '../user-card/user-card';
import {User} from '../../model/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-exercise-three',
  imports: [
    LoadingSpinner,
    UserCard
  ],
  templateUrl: './exercise-four.html'
})
export class ExerciseFour {
  users: User[] = [];

  constructor(private userService: UserService, private destroyRef: DestroyRef) {
  }

  loadUsers() {

  }
}
