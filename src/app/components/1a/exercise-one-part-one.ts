import {Component, DestroyRef} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';
import {Subscription} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {UserCard} from '../user-card/user-card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
  userSubscription = Subscription.EMPTY;

  constructor(private userService: UserService, private destroyRef: DestroyRef) {
  }

  loadUsers() {
    this.userSubscription = this.userService.getRandomUsers().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(users => {
      this.users = users;
    })
  }
}
