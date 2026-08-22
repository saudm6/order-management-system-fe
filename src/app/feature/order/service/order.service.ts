import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OrderRequest, OrderResponse } from '../models/';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  protected httpClient = inject(HttpClient);
  protected apiOrderUrl = `http://localhost:5210/api/order`;

  addOrder() : Observable<void> {
    return this.httpClient.post<void>(`${this.apiOrderUrl}`, null);
  }

  getOrder() : Observable<OrderResponse[]>{
    return this.httpClient.get<OrderResponse[]>(`${this.apiOrderUrl}`)
  }


//   createProduct(request: CreateProduct): Observable<ProductDisplay>{
//     return this.httpClient.post<ProductDisplay>(`${this.apiProductUrl}`, request);
//   }

//   getAllProducts(): Observable<ProductDisplay[]>{
//     return this.httpClient.get<ProductDisplay[]>(`${this.apiProductUrl}`);
//   }

//   getProductById(productId: string): Observable<ProductDisplay>{
//     return this.httpClient.get<ProductDisplay>(`${this.apiProductUrl}/${productId}`).pipe(
//       map((response) => {
//         const productData: ProductDisplay = {
//           id: response.id,
//           name: response.name,
//           unitPrice: response.unitPrice,
//           availableStock: response.availableStock,
//           reservedStock: response.reservedStock
//         };
//         return productData;
//       }),
//     );
//   }

//   updateProductDataById(productId: string, productUpdateData: ProductDataUpdate): Observable<ProductDataUpdate>{
//     return this.httpClient.patch<ProductDataUpdate>(`${this.apiProductUrl}/${productId}`, productUpdateData)
//   }

}
