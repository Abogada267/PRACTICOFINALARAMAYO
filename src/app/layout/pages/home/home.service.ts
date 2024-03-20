import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../../../core/services/loading.service';
import { Home } from '../home/home';
import { Product } from '../pages/products/models';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  constructor(private loadingService: LoadingService) {}

  getHome() {
    this.loadingService.setIsLoading(true);
    const home: Home[] = [
      { id: 1, name: 'Malvina' },
      { id: 2, name: 'Graciela' },
      { id: 3, name: 'Auricular' }
    ];
    return of(home).pipe(
      delay(1500),
      finalize(() => this.loadingService.setIsLoading(false))
    );
  }

  createProduct(data: Home) {
    this.products = [...this.products, { ...data, id: this.products.length + 1 }];
    return this.getProducts();
  }

  deleteProductById(id: number) {
    this.products = this.products.filter((el) => el.id !== id);
    return this.getProducts();
  }

  updateProductById(id: number, data: Product) {
    this.products = this.products.map((el) => (el.id === id ? { ...el, ...data } : el));
    return this.getProducts();
  }

  // Suponiendo que tienes una función para obtener los productos
  private getProducts(): Product[] {
    return this.products;
  }
}
