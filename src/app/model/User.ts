import {Observable, of} from 'rxjs';

export interface User {
  id: string,
  firstName: string,
  lastName: string,
  birth_date: string,
  email: string,
  isActive: boolean;
}
