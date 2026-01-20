import {Component, DestroyRef} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {UserCard} from '../user-card/user-card';

@Component({
  selector: 'app-home-component',
  imports: [
    ReactiveFormsModule,
    LoadingSpinner,
    UserCard
  ],
  templateUrl: './exercise-one-part-one.html'
})
export class ExerciseOnePartOne {
  users: User[] = [];

  constructor(private userService: UserService, private destroyRef: DestroyRef) {
  }

  loadUsers() {

  }
}
