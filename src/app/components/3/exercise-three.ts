import {Component, DestroyRef, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserCard} from '../user-card/user-card';
import {User} from '../../model/User';
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

  }
}
