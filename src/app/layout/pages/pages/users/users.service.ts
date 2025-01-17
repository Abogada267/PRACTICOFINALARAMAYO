import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, mergeMap, of } from 'rxjs';
import { environment } from '../../../../../../environment/environment';
import { Pagination } from '../../../../core/models/pagination';
import { AlertsService } from '../../../../core/services/alerts.service';
import { User } from './models';

const ROLES_DB: string[] = ['ADMIN', 'USER'];

let USERS_DB: User[] = [];

@Injectable()
export class UsersService {
  constructor(private alerts: AlertsService, private httpClient: HttpClient) {}

  generateString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
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

  getUsers() {
    ;
    return this.httpClient
      .get<User[]>(`${environment.apiURL}/users`, {
       
      })
      .pipe(
        catchError((error) => {
          this.alerts.showError('Error al cargar los usuarios');
          return of([]);
        })
      );
  }

  paginate(page: number, perPage = 5) {
    return this.httpClient.get<Pagination<User>>(
      `${environment.apiURL}/users?_page=${page}&_per_page=${perPage}`
    );
  }

  createUser(payload: User) {
    return this.httpClient
      .post<User>(`${environment.apiURL}/users`, {
        ...payload,
        token: this.generateString(15),
      })
      .pipe(mergeMap(() => this.getUsers()));
  }

  deleteUser(userID: number) {
    // USERS_DB = USERS_DB.filter((user) => user.id !== userID);
    // return this.getUsers().pipe(
    //   tap(() =>
    //     this.alerts.showSuccess('Realizado', 'Se elimino correctamente')
    //   )
    // );
    return this.httpClient
      .delete<User>(`${environment.apiURL}/users/${userID}`)
      .pipe(mergeMap(() => this.getUsers()));
  }

  getAllBuyers(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${environment.apiURL}/users?role=BUYER`
    );
  }
}
