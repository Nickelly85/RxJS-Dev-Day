import {Component, DestroyRef, OnInit} from '@angular/core';
import {UserCard} from "../user-card/user-card";
import {User} from '../../model/User';
import {filter, forkJoin, fromEvent, map, mergeMap, Subscription, switchMap, takeUntil, timer} from 'rxjs';
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

  constructor(private userService: UserService, private destroyRef: DestroyRef) {
  }

  ngOnInit(): void {

  }
}
