import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  CreateProduct
} from '../models/index';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { ProductDisplay } from '../models/product-display';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  protected httpClient = inject(HttpClient);
  protected apiObpUrl = `http://localhost:5210/api/product`;
  protected baseUrl = `http://localhost:5210/api`;
  // const token = localStorage.getItem('auth_token');
  // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


  createProduct(request: CreateProduct): Observable<ProductDisplay>{
    return this.httpClient.post<ProductDisplay>(`{this.apiObpUrl}/create`, request);
  }

//   getPagedUsers(pageNumber: number, pageSize: number): Observable<UserPagedResult<UserData>> {
//     return this.httpClient
//       .get<UserPagedResult<UserData>>(
//         `${this.apiObpUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
//       )
//       .pipe(
//         map((response) => {
//           const pagedResult: UserPagedResult<UserData> = {
//             items: response.items,
//             totalCount: response.totalCount,
//             pageNumber: response.pageNumber,
//             pageSize: response.pageSize,
//             totalPages: response.totalPages,
//           };
//           return pagedResult;
//         }),
//       );
//   }

//   getUserById(userId: string): Observable<UserData> {
//     return this.httpClient.get<UserData>(`${this.apiObpUrl}/${userId}`).pipe(
//       map((response) => {
//         const userData: UserData = {
//           id: response.id,
//           fullName: response.fullName,
//           email: response.email,
//           createdAt: response.createdAt,
//         };
//         return userData;
//       }),
//     );
//   }

//   registerUser(request: RegisterUserRequest): Observable<UserData> {
//     return this.httpClient.post<UserData>(`${this.apiObpUrl}/register`, request).pipe(
//       map((response) => {
//         const userData: UserData = {
//           id: response.id,
//           fullName: response.fullName,
//           email: response.email,
//           createdAt: response.createdAt,
//         };
//         return userData;
//       }),
//     );
//   }

//   updateUser(userId: string, request: UpdateUserRequest): Observable<UserData> {
//     return this.httpClient.patch<UserData>(`${this.apiObpUrl}/${userId}`, request);
//   }

//   loginUser(request: LoginUserRequest): Observable<LoginUserResponse> {
//     return this.httpClient.post<LoginUserResponse>(`${this.baseUrl}/login`, request);
//   }

//   deleteUser(userId: string): Observable<void> {
//     return this.httpClient.delete<void>(`${this.apiObpUrl}/${userId}`);
//   }


//   getToken(): string | null {
//     return localStorage.getItem('authToken');
//   }
//   setToken(token: string): void {
//     localStorage.setItem('authToken', token);
//   }

//   IsLoggedIn(): boolean {
//     const token = this.getToken();

//     if (!token){
//       return false;
//     }

//     try{
//       const decodedToken = jwtDecode<JwtPayload>(token);
//       return typeof decodedToken.exp === 'number' && decodedToken.exp * 1000 > Date.now();
//     } catch {
//       return false;
//     }
//   }
}
