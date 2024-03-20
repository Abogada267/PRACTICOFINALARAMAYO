import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from '../alumno';
import { AlumnosService } from '../core/services/alumnos.service';

@Component({
  selector: 'app-alumnos-detail',
  templateUrl: './alumnos-detail.component.html',
  styleUrls: ['./alumnos-detail.component.scss'],
})
export class AlumnosDetailComponent implements OnInit {
  alumno: Alumno | undefined;

  constructor(
    private route: ActivatedRoute,
    private alumnosService: AlumnosService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAlumno();
  }
  getAlumno(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.alumnosService.getAlumno(id)
        .subscribe(alumno => this.alumno = alumno);
    } else {
      console.error('ID parameter is null');
    }
  }
  

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.alumno) {
      this.alumnosService.updateAlumno(this.alumno)
        .subscribe(() => this.goBack());
    }
  }
}
