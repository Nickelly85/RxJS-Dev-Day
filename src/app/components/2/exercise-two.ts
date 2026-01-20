import {Component, DestroyRef, OnInit} from '@angular/core';
import {UserCard} from '../user-card/user-card';
import {User} from '../../model/User';
import {UserService} from '../../services/user.service';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';

@Component({
  selector: 'app-exercise-four',
  imports: [
    UserCard,
    LoadingSpinner
  ],
  templateUrl: './exercise-two.html',
})
export class ExerciseTwo implements OnInit {
  usersA: User[] = [];
  usersB: User[] = [];

  constructor(private userService: UserService, private destroyRef: DestroyRef) {
  }

  ngOnInit(): void {

  }

  loadUser() {

  }
}
