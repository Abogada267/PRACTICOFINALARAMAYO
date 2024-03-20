import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, mergeMap } from 'rxjs/operators';
import { environment } from '../../../../environment/environment';
import { User } from '../../layout/pages/users/models';
import { Pagination } from '../models/pagination';
import { AlertsService } from './alerts.service';

const ROLES_DB: string[] = ['ADMIN', 'USER'];

@Injectable({
  providedIn: 'root' 
})
export class UsersService {
  constructor(private alerts: AlertsService, private httpClient: HttpClient) {}

  generateString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getUserById(id: number | string): Observable<User | undefined> {
    return this.httpClient.get<User>(`${environment.apiURL}/users/${id}`);
  }

  getRoles(): Observable<string[]> {
    return of(ROLES_DB).pipe(delay(1000));
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiURL}/users`).pipe(
      catchError(() => {
        this.alerts.showError('Error al cargar los usuarios');
        return of([]);
      })
    );
  }

  paginate(page: number, perPage = 5): Observable<Pagination<User>> {
    return this.httpClient.get<Pagination<User>>(
      `${environment.apiURL}/users?_page=${page}&_per_page=${perPage}`
    );
  }

  createUser(payload: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiURL}/users`,payload).pipe(
    catchError(() => {
    this.alerts.showError('Error al cargar los usuarios');
    throw new Error('Error al crear el usuario'); 
               })
       );
  }

  deleteUser(userID: number): Observable<User[]> {
    return this.httpClient.delete<User[]>(`${environment.apiURL}/users/${userID}`).pipe(
      mergeMap(() => this.getUsers())
    );
  }

  getAllBuyers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiURL}/users?role=BUYER`);
  }
}
