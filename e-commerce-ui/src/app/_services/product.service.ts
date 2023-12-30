import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _httpClient: HttpClient) {}

  public addProduct(product: FormData) {
    return this._httpClient.post<Product>(
      'http://localhost:9090/addNewProduct',
      product
    );
  }
}
