import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private loadingService: LoadingService
  ) {
    this.loadingService.setIsLoading(true);
    this.usersService.getUserById(this.route.snapshot.params['id']).subscribe({
      next: (findedUser) => {
        console.log(findedUser);
      },
      complete: () => {
        this.loadingService.setIsLoading(false);
      },
    });
  }
}
