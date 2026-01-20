import {Component, DestroyRef, OnInit} from '@angular/core';
import {UserCard} from '../user-card/user-card';
import {User} from '../../model/User';
import {UserService} from '../../services/user.service';
import {BehaviorSubject, finalize, map, shareReplay, Subject, Subscription, switchMap} from 'rxjs';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {AsyncPipe} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-exercise-four',
  imports: [
    UserCard,
    LoadingSpinner,
    AsyncPipe
  ],
  templateUrl: './exercise-two.html',
})
export class ExerciseTwo implements OnInit {
  usersA: User[] = [];
  usersB: User[] = [];
  userSubject = new Subject<User[]>();
  loadUsers$ = new Subject<void>();
  loading$ = new BehaviorSubject(false);
  userSubscription = Subscription.EMPTY;

  constructor(private userService: UserService, private destroyRef: DestroyRef) {
  }

  ngOnInit(): void {
    // this.onInitManualSubscription();
    this.onInitEventEmitter();
  }

  loadUser() {
    // this.manualSubscription();
    this.subjectEventEmitter();
  }

  onInitManualSubscription() {
    this.userSubject.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(users => this.usersA = users);

    this.userSubject.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(users => this.usersB = users);
  }

  manualSubscription() {
    this.userSubscription = this.userService.getRandomUsers().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(users => this.userSubject.next(users));
  }

  onInitEventEmitter() {
    const users$ = this.loadUsers$.pipe(
      switchMap(() => {
        this.loading$.next(true);
        return this.userService.getRandomUsers().pipe(
          finalize(() => this.loading$.next(false))
        );
      }),
      takeUntilDestroyed(this.destroyRef),
      shareReplay(1),
    );

    users$.subscribe(users => this.usersA = users);

    users$.pipe(
      map(users => users.filter(user => user.isActive))
    ).subscribe(users => this.usersB = users);
  }

  subjectEventEmitter() {
    this.loadUsers$.next()
  }
}
