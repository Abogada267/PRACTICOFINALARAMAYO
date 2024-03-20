import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from '../app/core/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Estudio Juridico Malvina Aramayo';
  isLoading = false;
  
  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoading$.subscribe({
      next: (v) => {
        setTimeout(() => {
          this.isLoading = v;}, 0);
        }
        });
  };
  }