import { Routes } from '@angular/router';
import {ExerciseOnePartOne} from './components/1a/exercise-one-part-one';
import {ExerciseOnePartTwo} from './components/1b/exercise-one-part-two';
import {ExerciseThree} from './components/3/exercise-three';
import {ExerciseFour} from './components/4/exercise-four';
import {ExerciseTwo} from './components/2/exercise-two';
import {ExerciseFive} from './components/5/exercise-five';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '1a',
    pathMatch: 'full'
  },
  {
    path: '1a',
    component: ExerciseOnePartOne
  },
  {
    path: '1b',
    component: ExerciseOnePartTwo
  },
  {
    path: '2',
    component: ExerciseTwo
  },
  {
    path: '3',
    component: ExerciseThree
  },
  {
    path: '4',
    component: ExerciseFour
  },
  {
    path: '5',
    component: ExerciseFive
  }
];
