import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  UpdateUserRequest,
  UserData,
  UserPagedResult,
} from '../models/index';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected httpClient = inject(HttpClient);
  protected apiObpUrl = `http://localhost:5210/api/users`;

  getPagedUsers(pageNumber: number, pageSize: number): Observable<UserPagedResult<UserData>> {
    return this.httpClient
      .get<UserPagedResult<UserData>>(
        `${this.apiObpUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      )
      .pipe(
        map((response) => {
          const pagedResult: UserPagedResult<UserData> = {
            items: response.items,
            totalCount: response.totalCount,
            pageNumber: response.pageNumber,
            pageSize: response.pageSize,
            totalPages: response.totalPages,
          };
          return pagedResult;
        }),
      );
  }

  getUserById(userId: string): Observable<UserData> {
    return this.httpClient.get<UserData>(`${this.apiObpUrl}/${userId}`).pipe(
      map((response) => {
        const userData: UserData = {
          id: response.id,
          fullName: response.fullName,
          email: response.email,
          createdAt: response.createdAt,
        };
        return userData;
      }),
    );
  }

  updateUser(userId: string, request: UpdateUserRequest): Observable<UserData> {
    return this.httpClient.patch<UserData>(`${this.apiObpUrl}/${userId}`, request);
  }

  deleteUser(userId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiObpUrl}/${userId}`);
  }

}
