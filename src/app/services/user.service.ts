import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = '/api/v1/users'

  constructor(private http: HttpClient) {
  }

  getRandomUsers(): Observable<User[]> {
    return this.http.get<{ total: number; items: User[] }>(`${this.baseUrl}/?limit=10`).pipe(
      map(response => response.items),
      map(users => users.map(user => ({...user, isActive: Math.random() < 0.5})))
    );
  }

  getRandomUser(): Observable<User> {
    return this.http.get<{ total: number; items: User[] }>(`${this.baseUrl}/?limit=1`).pipe(
      map(response => response.items[0]),
      map(user => ({...user, isActive: Math.random() < 0.5}))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<any[]>('/users').pipe(
      map(response => response.map(item => {
        const [firstName, ...lastName] = item.name.split(' ');
        return {
          id: item.id,
          firstName,
          lastName: lastName.join(' '),
          birth_date: '1990-01-01',
          email: item.email,
          isActive: true
        }
      }))
    )
  }
}
