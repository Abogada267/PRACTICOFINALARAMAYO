import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Alumno } from '../../alumno';
import { MessageService } from '../../core/services/massage.service';
export class AlumnosService {
  private alumnosUrl = AlumnosService.AlumnosUrl; 

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  static AlumnosUrl: any;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.alumnosUrl)
      .pipe(
        tap(_ => this.log('fetched alumnos')),
        catchError(this.handleError<Alumno[]>('getAlumnos', []))
      );
  }

  getAlumnoNo404<Data>(id: number): Observable<Alumno> {
    const url = `${this.alumnosUrl}/?id=${id}`;
    return this.http.get<Alumno[]>(url)
      .pipe(
        map(alumnos => alumnos[0]), 
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} alumno id=${id}`);
        }),
        catchError(this.handleError<Alumno>(`getAlumno id=${id}`))
      );
  }

  getAlumno(id: number): Observable<Alumno> {
    const url = `${this.alumnosUrl}/${id}`;
    return this.http.get<Alumno>(url).pipe(
      tap(_ => this.log(`fetched alumno id=${id}`)),
      catchError(this.handleError<Alumno>(`getAlumno id=${id}`))
    );
  }

  searchAlumnos(term: string): Observable<Alumno[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Alumno[]>(`${this.alumnosUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found alumnos matching "${term}"`) :
         this.log(`no alumnos matching "${term}"`)),
      catchError(this.handleError<Alumno[]>('searchAlumnos', []))
    );
  }

  addAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.alumnosUrl, alumno, this.httpOptions).pipe(
      tap((newAlumno: Alumno) => this.log(`added alumno w/ id=${newAlumno.id}`)),
      catchError(this.handleError<Alumno>('addAlumno'))
    );
  }

  deleteAlumno(alumno: Alumno | number): Observable<Alumno> {
    const id = typeof alumno === 'number' ? alumno : alumno.id;
    const url = `${this.alumnosUrl}/${id}`;

    return this.http.delete<Alumno>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted alumno id=${id}`)),
      catchError(this.handleError<Alumno>('deleteAlumno'))
    );
  }

  updateAlumno(alumno: Alumno): Observable<any> {
    return this.http.put(this.alumnosUrl, alumno, this.httpOptions).pipe(
      tap(_ => this.log(`updated alumno id=${alumno.id}`)),
      catchError(this.handleError<any>('updateAlumno'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`AlumnosService: ${message}`);
  }
}

