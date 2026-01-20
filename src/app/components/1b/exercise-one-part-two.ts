import {Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {UserCard} from '../user-card/user-card';

@Component({
  selector: 'app-home-async-pipe-component',
  imports: [
    LoadingSpinner,
    UserCard
  ],
  templateUrl: './exercise-one-part-two.html'
})
export class ExerciseOnePartTwo {

  constructor(private userService: UserService) {
  }

  loadUsers() {

  }
}
