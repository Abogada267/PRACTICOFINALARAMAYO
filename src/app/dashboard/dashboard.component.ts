import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Alumno } from '../alumno';
import { AlumnosService } from '../core/services/alumnos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] , 
})
export class DashboardComponent implements OnInit {
  Alumnos: Alumno[] =[];

  constructor(private alumnosService: AlumnosService) { }

  ngOnInit() {
    this.getAlumnosFirst();
  }

  getAlumnosFirst(): void {
    this.alumnosService.getAlumnos()
      .pipe(
        first()
      )
      .subscribe(
        (alumnos: Alumno[]) => {
          this.Alumnos = alumnos;
        },
        (error: any) => {
          console.error('Error fetching alumnos:', error);
        }
      );
  }
}



