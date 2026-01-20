import {Component} from '@angular/core';
import {User} from '../../model/User';
import {BehaviorSubject, finalize, Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {UserCard} from '../user-card/user-card';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-home-async-pipe-component',
  imports: [
    LoadingSpinner,
    UserCard,
    AsyncPipe
  ],
  templateUrl: './exercise-one-part-two.html'
})
export class ExerciseOnePartTwo {
  loading$ = new BehaviorSubject(false);
  users$ = new Observable<User[]>();

  constructor(private userService: UserService) {
  }

  loadUsers() {
    this.loading$.next(true);
    this.users$ = this.userService.getRandomUsers().pipe(finalize(() => this.loading$.next(false)));
  }
}
