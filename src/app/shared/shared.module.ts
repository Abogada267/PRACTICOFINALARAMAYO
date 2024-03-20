import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FullNamePipe } from './full-name.pipe';
import { ResaltadoDirective } from './resaltado.directive';
import { ResaltadoDirective2 } from './resaltado2.directive';
import { ValidationErrorsPipe } from './validation-errors.pipe';
@NgModule({
  declarations: [
    FullNamePipe,
    ResaltadoDirective,
    ValidationErrorsPipe,
    ResaltadoDirective2,
  ],
  imports: [CommonModule],
  exports: [
    FullNamePipe,
    ResaltadoDirective,
     MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    ValidationErrorsPipe,
    MatPaginatorModule,
    ResaltadoDirective2,
  ],
})
export class SharedModule {}
