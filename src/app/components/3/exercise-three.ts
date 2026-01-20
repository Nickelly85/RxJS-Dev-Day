import {Component, DestroyRef, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserCard} from '../user-card/user-card';
import {User} from '../../model/User';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-exercise-two',
  imports: [
    FormsModule,
    UserCard,
    ReactiveFormsModule
  ],
  templateUrl: './exercise-three.html'
})
export class ExerciseThree implements OnInit {
  users: User[] = [];
  inputFormControl = new FormControl<string>('');

  constructor(private userService: UserService, private destroyRef: DestroyRef) {
  }

  ngOnInit(): void {
    this.inputFormControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.userService.getUsers().pipe(
        map(users => users.filter(user => [user.firstName, user.lastName].join(' ').toLowerCase().includes(value ? value.toLowerCase() : '')))
      )),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(users => {
      this.users = users
    })
  }
}
