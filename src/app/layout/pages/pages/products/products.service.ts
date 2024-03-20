import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { LoadingService } from '../../../../core/services/loading.service';
import { Product } from './models';

let products: Product[] = [
  {
    id: 1,
    name: 'PC Gamer',
    
  },
  {
    id: 2,
    name: 'Teclado Mecanico',
   
  },
  {
    id: 3,
    name: 'Auricular 7.1',
   
  },
];

@Injectable()
export class ProductsService {
  constructor(
    private loadingService: LoadingService,
    private httpClient: HttpClient
  ) {}

  getProducts() {
    this.loadingService.setIsLoading(true);
    return this.httpClient
      .get<Product[]>(`${environment.apiURL}/products`)
      .pipe(finalize(() => this.loadingService.setIsLoading(false)));
  }

  createProduct(data: Product) {
    products = [...products, { ...data, id: products.length + 1 }];
    return this.getProducts();
  }

  deleteProductById(id: number) {
    products = products.filter((el) => el.id != id);
    return this.getProducts();
  }

  updateProductById(id: number, data: Product) {
    products = products.map((el) => (el.id === id ? { ...el, ...data } : el));
    return this.getProducts();
  }
}
