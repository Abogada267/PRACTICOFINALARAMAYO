import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Home } from '../home/home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] ,
})
export class HomeComponent implements OnInit {
  homeNameInput: string = '';
  
  home: any; 
  productsService: any;

  constructor(
    private router: Router, 
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (home: any) => {
        this.home = home;
      },
    });
  }

  updateHomeName(event: any): void {
    this.homeNameInput = (event.target as HTMLInputElement).value;
  }

  navegarAotraPagina(): void {
    console.log('../listadealumnos');
    this.router.navigate(['../listadealumnos']); 
  }

  onCreate(): void {
    this.dialog
      .open(this.home)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.productsService.createProduct(result).subscribe({
              next: (home: Home[]) => {
                this.home = home;
              },
            });
          }
        },
      });
  }

  onEdit(product: Home) {
    this.dialog
      .open(this.home, {
        data: product, 
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.productsService.updateProductById(product.id, result).subscribe({
              next: (updatedHome: Home[]) => {
                this.home = updatedHome;
              },
            });
          }
        },
      });
  }

  onDelete(id: number): void {
    if (confirm('¿Está seguro?')) {
      this.productsService.deleteProductById(id).subscribe({
        next: (updatedHome: Home[]) => {
          this.home = updatedHome;
        },
      });
    }
  }
}

