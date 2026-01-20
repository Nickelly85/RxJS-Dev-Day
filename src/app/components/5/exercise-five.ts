import {Component, DestroyRef, OnInit} from '@angular/core';
import {UserCard} from "../user-card/user-card";
import {User} from '../../model/User';
import {filter, forkJoin, fromEvent, map, Subscription, switchMap, takeUntil, timer} from 'rxjs';
import {UserService} from '../../services/user.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-exercise-five',
  imports: [
    UserCard
  ],
  templateUrl: './exercise-five.html',
})
export class ExerciseFive implements OnInit {
  users: User[] = [];
  userSubscription = Subscription.EMPTY;
  clicks$ = fromEvent(document, 'click');
  dblclicks$ = fromEvent(document, 'dblclick');
  keydown$ = fromEvent<KeyboardEvent>(document, 'keydown');

  constructor(private userService: UserService, private destroyRef: DestroyRef) {
  }

  ngOnInit(): void {
    this.clicks$.pipe(
      switchMap(() =>
      timer(300).pipe(
        takeUntil(this.dblclicks$),
        switchMap(() => forkJoin({
          random: this.userService.getRandomUsers(),
          users: this.userService.getUsers()
        }))
      )),
      map(({random, users}) => [...random, ...users]),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(finalUsers => this.users = finalUsers);

    this.dblclicks$.pipe(
      switchMap(() => this.userService.getRandomUser()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(user => this.users = [...this.users, user]);

    this.keydown$.pipe(
      filter(event => event.key === 'Backspace'),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.users = []);
  }
}
