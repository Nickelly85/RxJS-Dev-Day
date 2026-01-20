import {Component, DestroyRef} from '@angular/core';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {UserCard} from '../user-card/user-card';
import {User} from '../../model/User';
import {interval, map, mergeMap, scan, startWith, Subscription, take, takeWhile} from 'rxjs';
import {UserService} from '../../services/user.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
  userSubscription = Subscription.EMPTY;

  constructor(private userService: UserService, private destroyRef: DestroyRef) {
  }

  loadUsers() {
    this.userSubscription = interval(1000).pipe(
      startWith(1),
      take(5),
      mergeMap(() => this.userService.getRandomUsers()),
      map(user => user.filter(user => user.email.includes('hotmail'))),
      scan((allUsers, newUsers) => [...allUsers, ...newUsers], [] as User[]),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(users => this.users = users);
  }

  loadUsersTakeWhile() {
    this.userSubscription = interval(1000).pipe(
      startWith(1),
      mergeMap(() => this.userService.getRandomUsers()),
      map(user => user.filter(user => user.email.includes('hotmail'))),
      scan((allUsers, newUsers) => [...allUsers, ...newUsers], [] as User[]),
      takeWhile(allUsers => allUsers.length <= 10, true),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(users => this.users = users);
  }
}
