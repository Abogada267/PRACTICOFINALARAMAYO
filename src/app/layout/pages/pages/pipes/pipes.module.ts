import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FullNamePipe } from '../../../../../app/shared/full-name.pipe';
import { SharedModule } from '../../../../shared/shared.module';
import { PipesComponent } from '../pipes/pipes.component';

@NgModule({
  declarations: [PipesComponent],
  imports: [CommonModule, SharedModule],
  exports: [PipesComponent],
  providers: [DatePipe, FullNamePipe],
})
export class PipesModule {}
